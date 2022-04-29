import sharp from 'sharp'

export async function get(params, request) {
  const acceptHeaders = request.headers.get('accept')
  const hostName = new URL(request.url).hostname
  const searchParams = new URL(request.url).searchParams //gets the params
  const webp = acceptHeaders.includes('image/webp')

  // block other domains
  // if (hostName !== 'localhost') return

  const CHdpr = request.headers.get('dpr')
  const CHwidth =
    request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1 / CHdpr))

  const src = searchParams.get('src') //gets the src
  const format = searchParams.get('format') //gets the format
  const preload = searchParams.get('preload') == 'true' ? true : false //whether or not you want all images saved to disk (default: false)
  const width = Number(searchParams.get('width')) || Number(CHwidth) || null //gets the set width, falls back to client hints
  const rotate = Number(searchParams.get('rotate')) || null //gets the rotatation angle
  const height = Number(searchParams.get('height')) || null //gets the height
  const flip = searchParams.get('flip') == 'true' ? true : false //gets the flip
  const flop = searchParams.get('flop') == 'true' ? true : false //gets the flop
  const fit = searchParams.get('fit') || "inside" //cover, contain, fill, inside, outside (default: inside)
  const position = searchParams.get('position') //top, right top, right, right bottom, bottom, left bottom, left, left top
  const gravity = searchParams.get('gravity') //north, northeast, east, southeast, south, southwest, west, northwest, center
  const strategy = searchParams.get('strategy') //entropy, attention
  const quality = searchParams.get('quality') ? Number(searchParams.get('quality')) : null//integer 1-100


  let animated = searchParams.get('animated') //gets if animated (true/false)
  const originalFormat = src.substring(src.lastIndexOf('.') + 1).toLocaleLowerCase() //gets the original format

  const isAnimated = animated == 'true' || originalFormat == 'gif' ? true : false //sets if animated

  if (!src) return { status: 400, body: 'No src provided' }

  const imgData = src.startsWith('/assets/')
    ? 'public' + src
    : await fetch(src).then((res) => res.buffer())

  let resizedImage

  // if (blur) {
  // 	//sharp needs path from root directory
  // 	resizedImage = await sharp(imgData, {animated: isAnimated} )
  // 	.rotate(rotate)
  // 	.resize(20, 20)
  // 	.toFormat(format)
  // 	// .toColourspace('b-w')
  // 	// .jpeg({ mozjpeg: true, quality: 10, progressive: false })
  // 	// .toFormat(format)
  // 	.toBuffer()
  // 	}
  // 	else

  if (preload) {
    const destination = `public/infinity/${src.substring(
      src.lastIndexOf('/') + 1
    )}-w=${width}-h=${height}.${format}`
    const url = `/infinity/${src.substring(
      src.lastIndexOf('/') + 1
    )}-w=${width}-h=${height}.${format}`
    resizedImage = await sharp(imgData, { animated: isAnimated })
      .rotate(rotate)
      .flip(flip)
      .flop(flop)
      .resize(width, height, { fit, position, strategy, gravity })
      .toFormat(format, { quality })
      .toFile(destination)
    //just send back the url of the asset
    return new Response(JSON.stringify({ url }), {
      status: 200
    })
  } else if (isAnimated && webp) {
    //sharp needs path from root directory
    resizedImage = await sharp(imgData, { animated: isAnimated })
      .rotate(rotate)
      .flip(flip)
      .flop(flop)
      .resize(width, height, { fit, position, strategy, gravity})
      .webp({ effort: 0, quality })
      .toBuffer()

    return new Response(resizedImage, {
      status: 200,
      headers: {
        'Content-Type': 'video/webp',
        'Cache-Control': 'public, max-age=15552000',
        'mime-type': 'video/webp',
        Vary: 'accept, width, dpr, viewport-width'
      }
    })
  } else {
    //sharp needs path from root directory
    resizedImage = await sharp(imgData, { animated: isAnimated })
      .rotate(rotate)
      .resize(width, height, { fit, position, strategy, gravity })
      .toFormat(format, { quality })
      .toBuffer()
  }

  return new Response(resizedImage, {
    status: 200,
    headers: {
      'Content-Type': 'image/' + format,
      'Cache-Control': 'public, max-age=15552000',
      'mime-type': 'image/' + format,
      Vary: 'accept, width, dpr, viewport-width'
    }
  })
}
