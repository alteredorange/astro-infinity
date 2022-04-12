import sharp from 'sharp';


export async function get(params, request) {

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
	const width = Number(searchParams.get('width')) || null//gets the width
	const rotate = Number(searchParams.get('rotate')) || null //gets the rotatation angle
	const height = Number(searchParams.get('height')) //gets the height
	const grayscale = searchParams.get('grayscale') //gets the grayscale
	const blur = searchParams.get('blur') //gets the blur
	const sharpen = searchParams.get('sharpen') //gets the sharpen
	const gamma = searchParams.get('gamma') //gets the gamma
	const quality = searchParams.get('quality') //gets the quality
	const progressive = searchParams.get('progressive') //gets the progressive

	const imgData = src.startsWith('/assets/') ? 'public' + src : await fetch(src).then(res => res.buffer())



	//sharp needs path from root directory
	const image = await sharp(imgData )
	.rotate(rotate)
	.resize(width)
	.webp()
	.toBuffer()


	return new Response(image, {
		headers: {
		  'Content-Type': 'image/webp',
		  'Cach-Control': 'public, max-age=31536000',
		  'mime-type': 'image/webp'
		}
	      });



      }