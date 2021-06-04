import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import scss from "rollup-plugin-scss";
// import deepmerge from 'deepmerge';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

// const arrayMerge = (destination, source) => [ ...destination, ...source ];

const isDev = process.env.NODE_ENV !== 'production'

const filename = 'micro-dom';
const name = 'MicroDOM';

const config = [];

if (isDev) {  // Dev
  config.push({
    input: 'src/index.dev.ts',
    output: {
      sourcemap: true,
      name,
      format: 'iife',
      file: `dev/${filename}.dev.js`,
      plugins: [
        terser({
          format: {
            indent_level: 2,
            beautify: true,
            comments: false,
          }
        }),
      ]
    },
    plugins: [
      typescript({
        target: 'esnext',
      }),
      resolve({
        browser: true
      }),
      scss({
        watch: 'src/scss/',
        output: `dev/${filename}.dev.css`,
        failOnError: true,
      }),
    ]
  });
} else {  // Prod
  config.push({
    input: 'src/index.es.ts',
    external: ['@xaro/event-emitter', '@xaro/micro-dom'],
    output: [
      {
        sourcemap: true,
        name,
        format: 'es',
        file: `dist/${filename}.es.js`,
      }
    ],
    plugins: [
      typescript({
        target: 'esnext',
      }),
      terser({
        format: {
          beautify: true,
          comments: true,
        },
        mangle: false,
      }),
    ]
  }, {
    input: 'src/index.ts',
    output: [
      {
        sourcemap: true,
        name,
        format: 'iife',
        file: `dist/${filename}.js`,
      }, {
        sourcemap: true,
        name,
        format: 'umd',
        file: `dist/${filename}.umd.js`,
      }
    ],
    plugins: [
      typescript({
        target: 'esnext',
      }),
      commonjs(),
      terser({
        format: {
          beautify: true,
        }
      }),
      resolve({
        browser: true,
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "defaults"
            }
          ]
        ],
      }),
    ]
  });
}

export default config;