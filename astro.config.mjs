import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

import astroImagePlugin from 'astro-imagetools/plugin'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), partytown(), node(), tailwind()],
  vite: {
    vite: {
      plugins: [astroImagePlugin]
    },
    ssr: {
      external: ['svgo', 'astro-icon', 'sharp']
    }
  }
})
