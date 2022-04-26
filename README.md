<p align="center">
<img  src="./AstroInfinityLogo.gif" alt="Astro Infinity logo">
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

## options

src //REQUIRED - the local path or full URL of an image
width //Strongly recommended - the width of your image
height //Strongly recommended - the height of your image
rotate //how many degrees do you want to rotate your image
style //the class names to pass back to the image (useful if using Tailwind)
flip //flip your image on the vertical y axis, defaults to false
flop //flip your image on the horizontal x axis, defaults to false
animated //If the image is animated (i.e. animated webp), set this to true
preload //whether or not images should save to disk (mainly for static sites), defaults to false
alt //Strongly recommended - the alt tag of the image

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
