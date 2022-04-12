import sharp from 'sharp';


export async function get(params, request) {

	const searchParams = new URL(request.url).searchParams //gets the params
	const src = searchParams.get('src') //gets the src
	const width = searchParams.get('width') //gets the width
	const height = searchParams.get('height') //gets the height
	const grayscale = searchParams.get('grayscale') //gets the grayscale
	const blur = searchParams.get('blur') //gets the blur
	const sharpen = searchParams.get('sharpen') //gets the sharpen
	const gamma = searchParams.get('gamma') //gets the gamma
	const quality = searchParams.get('quality') //gets the quality
	const progressive = searchParams.get('progressive') //gets the progressive
 console.log('src', src)

	//sharp needs path from root directory
	const image = await sharp('public' + src )
	.rotate(50)
	.resize(200)
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