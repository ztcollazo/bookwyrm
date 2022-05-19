/* eslint-disable new-cap */
import {defineConfig} from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import StimulusHMR from 'vite-plugin-stimulus-hmr';
import WindiCSS from 'vite-plugin-windicss';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  plugins: [
    RubyPlugin(),
    StimulusHMR(),
    FullReload(['config/routes.rb', 'app/views/**/*'], {delay: 200}),
    WindiCSS({
      // eslint-disable-next-line no-undef
      root: __dirname,
      scan: {
        fileExtensions: [
          'erb',
          'haml',
          'html',
          'vue',
          'js',
          'ts',
          'jsx',
          'tsx',
        ],
        dirs: ['app/views', 'app/javascript', 'app/helpers'],
      },
    }),
  ],
});
