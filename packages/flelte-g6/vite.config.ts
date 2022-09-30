import { svelte } from '@sveltejs/vite-plugin-svelte'
import type { UserConfig } from 'vite'
import unocss from 'unocss/vite'
import transformerDirective from '@unocss/transformer-directives'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const config: UserConfig = {
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
    unocss({
      transformers: [transformerDirective()],
      mode: 'shadow-dom',
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    include: ['@antv/g6'],
  },
  resolve: {
    alias: {
      $lib: resolve(__dirname, 'src/lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: '@flies-ui/flelte-g6',
      fileName: 'flelte-g6',
    },
  },
}

export default config
