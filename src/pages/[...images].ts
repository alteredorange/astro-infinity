import sharp from 'sharp';
// const { SSR, IMAGE_API_SECRET, PUBLIC_SOME_KEY } = import.meta.env;

export async function get(params, request) {
	// console.log(request)
	const acceptHeaders = request.headers.get('accept');

	const hostName = new URL(request.url).hostname

	// if (hostName !== 'localhost') return
	// console.log({hostName})
	const format = acceptHeaders == "*/*" ? "avif" : acceptHeaders.includes("image/avif") ? "avif" : acceptHeaders.includes("image/webp") ? "webp" : "jpg";
	console.log({format})
	const CHdpr = request.headers.get('dpr')
	const CHwidth = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
console.log({CHdpr})
	const test = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
	console.log({test})

// 	const h = request.headers.get('height')
// console.log({w})
// const sec = request.headers.get('Sec-CH-Width')
// console.log({sec})

	// const img = await fetch ("https://picsum.photos/500/400?random");
	// const arrayBuffer = await img.arrayBuffer();
	// const buffer = Buffer.from(arrayBuffer);


	// //sharp needs path from root directory
	// const image = await sharp(buffer)
	// .rotate()
	// .resize()
	// .webp()
	// .toBuffer()


	// return new Response(image, {
	// 	headers: {
	// 	  'Content-Type': 'image/webp',
	// 	  'Cach-Control': 'public, max-age=31536000',
	// 	  'mime-type': 'image/webp'
	// 	}
	//       });

	// console.log(img);


	const searchParams = new URL(request.url).searchParams //gets the params
	const src = searchParams.get('src') //gets the src
	const width = Number(searchParams.get('width')) || Number(CHwidth) || undefined//gets the width
	const rotate = Number(searchParams.get('rotate')) || undefined //gets the rotatation angle
	const height = Number(searchParams.get('height')) || undefined//gets the height
	const grayscale = searchParams.get('grayscale') //gets the grayscale
	const blur = searchParams.get('blur') //gets the blur
	const sharpen = searchParams.get('sharpen') //gets the sharpen
	const gamma = searchParams.get('gamma') //gets the gamma
	const quality = searchParams.get('quality') //gets the quality
	const progressive = searchParams.get('progressive') //gets the progressive

	const imgData = src.startsWith('/assets/') ? 'public' + src : await fetch(src).then(res => res.buffer())


if (blur) {
	//sharp needs path from root directory
	const image = await sharp(src )
	.rotate(rotate)
	.resize({width: 20, height: 20, fit: 'cover'})
	.toFormat(format)
	// .toColourspace('b-w')
	// .jpeg({ mozjpeg: true, quality: 10, progressive: false })
	// .toFormat(format)
	.toBuffer()


	return new Response(image, {
		headers: {
		  'Content-Type': 'image/' + format,
		  'Cach-Control': 'public, max-age=15552000',
		  'mime-type': 'image/' + format,
		  'Vary': 'accept, width, dpr, viewport-width'

		}
	      });
	} else {

//sharp needs path from root directory
const image = await sharp(imgData )
.rotate(rotate)
.resize(width, 500, {fit: 'inside', position: 'attention'})
.toFormat(format)
.toBuffer()


return new Response(image, {
	headers: {
	  'Content-Type': 'image/' + format,
	  'Cach-Control': 'public, max-age=15552000',
	  'mime-type': 'image/' + format,
	}
      });

	}



      }