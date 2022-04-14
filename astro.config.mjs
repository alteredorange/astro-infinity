import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import partytown from '@astrojs/partytown'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import astroImagePlugin from 'astro-imagetools/plugin'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), partytown(), tailwind(), node()],
  vite: {
    vite: {
      plugins: [astroImagePlugin]
    },
    ssr: {
      external: ['svgo', 'astro-icon', 'sharp']
    }
  }
})
