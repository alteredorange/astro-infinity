# [Astro](https://astro.build) Image Component WIP

## Install
```
git clone https://github.com/alteredorange/astro-image astro-image-demo
cd astro-image-demo
npm install //pnpm install, yarn add
npm dev  //see the demo site locally
npm build  //build node compatible ssr site
npm serve  //serve the build folder using serveNode.mjs
```

## About
Currently the `<Image />` component will generate images on the fly as users request them (using a server side function). Still working on being able to preload all images for completely static sites.

Open the index.astro file to see how the `<Image />` component is being used. It will automatically select the best image format, and resize the image according to the width and height set in the component.

Please open an issue for any questions and/or bugs, thanks!