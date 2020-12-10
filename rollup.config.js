import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'

export default {
  input: 'src/index.js',
  output: {
    file: 'themable-grid.js',
    format: 'umd',
    name: 'ThemableGrid',
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
    resolve(),
  ],
}
