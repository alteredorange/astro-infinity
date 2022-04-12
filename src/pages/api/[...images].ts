import sharp from 'sharp';
const fileCache = new Map();
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
	console.log("params", params)

	console.log(params.images)

	// console.log(request)

	const thing = await sharp('public/assets/Glasses.png')
	.rotate(10)
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