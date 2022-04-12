import sharp from 'sharp';
const fileCache = new Map();
// import Astro from 'astro';
	//   .toFile('public/assets/sharp/Glasses.webp')
async function main() {
	console.log("starting Main")

	const thing = await sharp('public/assets/Glasses.png')
		.rotate(180)
		.resize(200)
		.webp()
		.toBuffer()
	// 	  .then( data => {
	// 		  console.log("i Has Data")
	// 		// console.log(data)
	// 		    fileCache.set('Glasses2.png', data);
	// 		      fileCache.set('Glasses.png', data);
	// 	      //       console.log(fileCache)
	// 		//     return new Response(data, {
	// 		//       headers: {
	// 		// 	'Content-Type': 'image/webp',
	// 		// 	'Cach-Control': 'public, max-age=31536000',
	// 		// 	'mime-type': 'image/webp'
	// 		//       }
	// 		//     });
	// 		    console.log('done with main up top')

	// })
	console.log(thing)
	return thing;
}


// main()




export async function get(params, request) {

	const searchParams = new URL(request.url).searchParams //gets the params
	const src = searchParams.get('src') //gets the src
	const width = searchParams.get('width') //gets the width
	const height = searchParams.get('height') //gets the height
	const rotate = searchParams.get('rotate') //gets the rotate
	const flip = searchParams.get('flip') //gets the flip
	const flipVertical = searchParams.get('flipVertical') //gets the flipVertical
	const flipHorizontal = searchParams.get('flipHorizontal') //gets the flipHorizontal
	const grayscale = searchParams.get('grayscale') //gets the grayscale
	const blur = searchParams.get('blur') //gets the blur
	const sharpen = searchParams.get('sharpen') //gets the sharpen
	const gamma = searchParams.get('gamma') //gets the gamma
	const rotate90 = searchParams.get('rotate90') //gets the rotate90
	const rotate180 = searchParams.get('rotate180') //gets the rotate180
	const rotate270 = searchParams.get('rotate270') //gets the rotate270
	const quality = searchParams.get('quality') //gets the quality
	const progressive = searchParams.get('progressive') //gets the progressive


	const queries = request.url.searchParams  //coudln't get any variation to work

	console.log("queries", searchParams.get("src"))
	let props = params.props;
	//use regex to extra width and height from props
// extract resize width and height from string src:123/resize:300:400
	// let width = 0;
	// let height = 0;
	// let regex = /src:(\d+)/;
	// let matches = regex.exec(props);

const regex = /(?=resize:).*(?=\/)/

// const myArray = props.split("/");



	// const width = props.match(regex)[0].split(':')[1];
	// console.log(props)
	// console.log(width)


	// let wh= props.rege
	// console.log("params", params)
	// const height = params.props
	// console.log(query)



	// console.log(request)

	const thing = await sharp('public/assets/Glasses.png')
	.rotate(50)
	.resize(200)
	.webp()
	.toBuffer()

	// const hiya = await main();
	// console.log("main done")

	return new Response(thing, {
		headers: {
		  'Content-Type': 'image/webp',
		  'Cach-Control': 'public, max-age=31536000',
		  'mime-type': 'image/webp'
		}
	      });


	// const profile = await request.json();
	// console.log(request)

	// return new Response(JSON.stringify({ ok: true }), {
	// 	status: 200,
	// 	headers: {
	// 	  'Content-Type': 'application/json'
	// 	}
	//       });

	await sharp('public/assets/Glasses.png')
	.rotate(45)
	.resize(200)
	.webp()
	//   .toFile('public/assets/sharp/Glasses.webp')
	  .toBuffer()
	  .then( data => {
		//   console.log(data)
		      fileCache.set('Glasses2.png', data);
			fileCache.set('Glasses.png', data);
		//       console.log(fileCache)
		      return new Response(data, {
			headers: {
			  'Content-Type': 'image/webp',
			  'Cach-Control': 'public, max-age=31536000',
			  'mime-type': 'image/webp'
			}
		      });
	   })
	  .catch( err => {

		return new Response(err, {
			status: 201,
			headers: {
			  'Content-Type': 'image/webp',
			  'Cach-Control': 'public, max-age=31536000',
			  'mime-type': 'image/webp'
			}
		      });


		console.log(err) });
// console.log("FILECACHE")
// console.log(fileCache['Glasses.png'])
	// await saveProfile(profile);

	return new Response(JSON.stringify({status: "ok"}), {
		status: 200,
		headers: {
		//   'Content-Type': 'image/webp',
		//   'Cach-Control': 'public, max-age=31536000',
		//   'mime-type': 'image/webp'
		}
	      });

      }