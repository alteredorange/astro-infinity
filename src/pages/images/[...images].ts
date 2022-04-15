import sharp from 'sharp';
// const { SSR, IMAGE_API_SECRET, PUBLIC_SOME_KEY } = import.meta.env;

export async function get(params, request) {
	// console.log(request)
	const acceptHeaders = request.headers.get('accept');
	const hostName = new URL(request.url).hostname
	const searchParams = new URL(request.url).searchParams //gets the params
	const gif = searchParams.get('gif') //gets the gif
	const webp = acceptHeaders.includes("image/webp")

	// block other domains
	// if (hostName !== 'localhost') return

	const format = acceptHeaders == "*/*" ? "avif" : acceptHeaders.includes("image/avif") ? "avif" : acceptHeaders.includes("image/webp") ? "webp" : "jpg";
	// console.log({format})
	const CHdpr = request.headers.get('dpr')
	const CHwidth = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
// console.log({CHdpr})
	const test = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
	console.log({test})


	const src = searchParams.get('src') //gets the src
	const width = Number(searchParams.get('width')) || Number(CHwidth) || null//gets the width
	const rotate = Number(searchParams.get('rotate')) || null //gets the rotatation angle
	const height = Number(searchParams.get('height')) || null//gets the height
	const flip = searchParams.get('flip') == "true" ? true: false //gets the flip
	const flop = searchParams.get('flop') == "true" ? true: false  //gets the flop
	const grayscale = searchParams.get('grayscale') //gets the grayscale
	const blur = searchParams.get('blur') //gets the blur
	const sharpen = searchParams.get('sharpen') //gets the sharpen
	const gamma = searchParams.get('gamma') //gets the gamma
	const quality = searchParams.get('quality') //gets the quality
	const progressive = searchParams.get('progressive') //gets the progressive
	const prebuild = searchParams.get('prebuild') //if you want the image to be prebuit (true/false)
	let animated = searchParams.get('animated') //gets if animated (true/false)
	const originalFormat = src.substring(src.lastIndexOf('.')+1).toLocaleLowerCase() //gets the original format

	const isAnimated = animated == 'true' || originalFormat == 'gif' ? true : false //sets if animated

console.log({flip, flop})

	// if ((animated === 'true') || (originalFormat == "gif")) animated = true

	if (!src) return { status: 400, body: 'No src provided' }


	const imgData = src.startsWith('/assets/') ? 'public' + src : await fetch(src).then(res => res.buffer())




let resizedImage;

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

	if (isAnimated && webp) {

//sharp needs path from root directory
resizedImage = await sharp(imgData, {animated: isAnimated} )
.rotate(rotate)
.flip(flip)
.flop(flop)
.resize(width, height, {fit: 'inside'})
.webp({ effort: 0 })
// .toFormat("webp")
.toBuffer()

return new Response(resizedImage, {
	status: 200,
	headers: {
	  'Content-Type': 'video/webp',
	  'Cache-Control': 'public, max-age=15552000',
	  'mime-type': 'video/webp',
	  'Vary': 'accept, width, dpr, viewport-width',
	}
      });


	}
	else {
	//sharp needs path from root directory
resizedImage = await sharp(imgData, {animated: isAnimated} )
.rotate(rotate)
.resize(width, height, {fit: 'inside'})
.toFormat(format)
.toBuffer()

	}

	return new Response(resizedImage, {
		status: 200,
		headers: {
		  'Content-Type': 'image/' + format,
		  'Cache-Control': 'public, max-age=15552000',
		  'mime-type': 'image/' + format,
		  'Vary': 'accept, width, dpr, viewport-width',
		}
	      });


      }