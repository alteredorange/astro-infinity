import sharp from 'sharp';
// const { SSR, IMAGE_API_SECRET, PUBLIC_SOME_KEY } = import.meta.env;

export async function get(params, request) {
	// console.log(request)
	const acceptHeaders = request.headers.get('accept');
	const hostName = new URL(request.url).hostname
	const searchParams = new URL(request.url).searchParams //gets the params
	const gif = searchParams.get('gif') //gets the gif

	// block other domains
	// if (hostName !== 'localhost') return

	const format = gif ? "gif" : acceptHeaders == "*/*" ? "avif" : acceptHeaders.includes("image/avif") ? "avif" : acceptHeaders.includes("image/webp") ? "webp" : "jpg";
	console.log({format})
	const CHdpr = request.headers.get('dpr')
	const CHwidth = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
console.log({CHdpr})
	const test = request.headers.get('viewport-width') || Math.round(request.headers.get('width') * (1/CHdpr)) || 0;
	console.log({test})


	const src = searchParams.get('src') //gets the src
	const width = Number(searchParams.get('width')) || Number(CHwidth) || null//gets the width
	const rotate = Number(searchParams.get('rotate')) || null //gets the rotatation angle
	const height = Number(searchParams.get('height')) || null//gets the height
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



	// if ((animated === 'true') || (originalFormat == "gif")) animated = true

	if (!src) return { status: 400, body: 'No src provided' }


	const imgData = src.startsWith('/assets/') ? 'public' + src : await fetch(src).then(res => res.buffer())




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



// console.log({src})
// console.log({imgData})
// if (gif) {

// 	//sharp needs path from root directory
// 	const image = await sharp(imgData, {animated: originalFormat == "gif" ? true : false} )
// 	.rotate(rotate)
// 	.resize(width, height, {fit: 'inside'})
// 	.toFormat('gif')
// 	// .toColourspace('b-w')
// 	// .jpeg({ mozjpeg: true, quality: 10, progressive: false })
// 	// .toFormat(format)
// 	.toBuffer((err, data, info) => { console.log(info.size) });

// 	return new Response(image, {
// 		headers: {
// 		  'Content-Type': 'image/gif',
// 		  'Cache-Control': 'public, max-age=15552000',
// 		  'mime-type': 'image/gif',
// 		  'Vary': 'accept, width, dpr, viewport-width',


// 		}
// 	      });
// } else

let resizedImage;
if (blur) {
	//sharp needs path from root directory
	resizedImage = await sharp(imgData, {animated: isAnimated} )
	.rotate(rotate)
	.resize({width: 20, height: 20, fit: 'cover'})
	.toFormat(format)
	// .toColourspace('b-w')
	// .jpeg({ mozjpeg: true, quality: 10, progressive: false })
	// .toFormat(format)
	.toBuffer()
	} else {

//sharp needs path from root directory
resizedImage = await sharp(imgData, {animated: isAnimated} )
.rotate(rotate)
.resize(width, height, {fit: 'inside', position: 'attention'})
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