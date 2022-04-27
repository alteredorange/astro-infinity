<p align="center">
<img  src="./AstroInfinityRepeat.gif" alt="Astro Infinity logo">
</p>

## Install

```
git clone https://github.com/alteredorange/astro-infinity astro-infinity
cd astro-infinity
npm install //pnpm install, yarn add
npm dev  //see the demo site locally
npm build  //build node compatible ssr site
npm serve  //serve the build folder using serveNode.mjs
```

## Usage

Import the image component into any astro page:

```
import Image from '../components/astro/Image.astro'
```

Use the Image component with the options below.
**If you use the preload option, images will be put in the `public/assets/prebuild` folder (make sure it exists/don't delete it) and be served from there.**

## options

| Param    	| Description                                                                                                                             	| Options/Examples                                                                               	|
|----------	|-----------------------------------------------------------------------------------------------------------------------------------------	|------------------------------------------------------------------------------------------------	|
| src      	| The local path or full URL of an image                                                                                                  	| /assets/large.jpg, https://image.com/1.jpg                                                     	|
| width    	| The desired width of your image                                                                                                         	| 400, 150                                                                                       	|
| height   	| The height of your image                                                                                                                	| 600, 250                                                                                       	|
| fit      	| The resizing strategy                                                                                                                   	| cover, contain, fill, inside, outside (default: inside)                                        	|
| position 	| When resizing, you can use position OR gravity OR strategy to focus on certain areas of the image                                       	| top, right top, right, right bottom, bottom, left bottom, left, left top                       	|
| gravity  	| When resizing, you can use position OR gravity OR strategy to focus on certain areas of the image                                       	| north, northeast, east, southeast, south, southwest, west, northwest, center (default: center) 	|
| strategy 	| When resizing, you can use position OR gravity OR strategy to focus on certain areas of the image. Strategy only works when fit=cover.  	| entropy, attention (only usable when fit=cover)                                                	|
| quality  	| Quality of image from 1-100                                                                                                             	| 50, 25 (different defaults depending on image format)                                          	|
| rotate   	| How many degrees do you want to rotate your image                                                                                       	| 45, 90                                                                                         	|
| style    	| The class names to pass back to the image (useful if using Tailwind)                                                                    	| ml-10, p-20, mt-5                                                                              	|
| flip     	| Flip your image on the vertical y axis, defaults to false                                                                               	| true, false                                                                                    	|
| flop     	| Flip your image on the horizontal x axis, defaults to false                                                                             	| true, false                                                                                    	|
| animated 	| If the image is animated, but not a gif (i.e. animated webp), set this to true                                                          	| true, false                                                                                    	|
| preload  	| whether or not the image should save to disk (mainly for static sites), defaults to false                                               	| true, false                                                                                    	|
| alt      	| The alt tag of the image, strongly recommended to add this!                                                                             	| To infinity and beyond!                                                                        	|


## Examples

A source image that's located in the assets folder, rotated 45 degrees, with a margin-left of 10px, and padding of 10px (using tailwind):

```
<Image
	src='/assets/large.jpg'
	width='400'
        height='400'
        rotate='45'
        alt='To Inifinity and Beyond'
        style='ml-10 p-10'
/>
```

A remote image set to generate all images to file (for a purely static site)

```
<Image
        src='https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg'
        width='400'
        height='400'
        alt='shoot for the stars'
        style='ml-10'
	preload=true
/>
```

## About

Astro Infinity is an `<Image />` component for Astro sites. By default it will generate images on the fly as users request them using a server side function. You can also tell Astro Infinity to prebuild an `<Image />` component so all the files will be available for a static site.

Open the index.astro file to see how the `<Image />` component is being used. It will automatically select the best image format, and resize the image according to the width and height set in the component.

I intentionally did not look into any other image components (i.e. astro-imagetools) for a few reasons:

1. As this is for the Astro Hackaton, I didn't think it would be fair to get a head start by using other work.
2. I wanted to see what I could come up with on my own.
3. I didn't want to be biased by seeing how other people might be solving the same problem (and just doing what they did).

Please open an issue for any questions and/or bugs, thanks!
