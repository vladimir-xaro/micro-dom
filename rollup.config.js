import typescript from '@rollup/plugin-typescript';
// import preprocess from "svelte-preprocess";
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import deepmerge from 'deepmerge';

const merge = (x, y) => deepmerge(x, y, { arrayMerge: (destination, source) => [...destination, ...source] });

export default CLIArgs => {
  const mode = process.env.BUILD || 'development';
  const isDev = mode === 'development';

  const name = '_';
  const filename = 'micro-dom';

  let result = [];

  if (isDev) {
    result.push({
      input: 'src/index.dev.ts',
      output: {
        sourcemap: true,
        name,
        format: 'iife',
        file: `dev/${filename}.js`,
        plugins: [
          resolve({
            browser: true,
          }),
          typescript({
            target: 'es5'
          }),
        ]
      },
      plugins: [],
    })
  } else {
    const base = {
      // input: 'src/index.ts',
      output: [],
      plugins: [
        cleanup({
          comments: 'none'
        }),
      ],
    };
    const baseOutput = {
      sourcemap: true,
      name
    }

    result.push(
      merge(base, {
        input: 'src/entry.ts',
        plugins: [
          resolve({
            browser: true,
          }),
          typescript({
            target: 'es5'
          }),
        ]
      }),
      merge(base, {
        input: 'src/index.ts',
        plugins: [
          typescript({
            target: 'esnext'
          }),
        ]
      }),
    );

    // es5
    result[0].output.push(
      merge(baseOutput, {
        exports: 'default',
        format: 'iife',
        file: `dist/${filename}.js`
      }),
      merge(baseOutput, {
        exports: 'default',
        format: 'iife',
        file: `dist/${filename}.min.js`,
        plugins: [
          terser(),
        ]
      }),
    );

    // es
    result[1].output.push(
      merge(baseOutput, {
        format: 'es',
        file: `dist/${filename}.es.js`,
      }),
      merge(baseOutput, {
        format: 'es',
        file: `dist/${filename}.es.min.js`,
        plugins: [
          terser(),
        ]
      }),
    );
  }

  return result;
}