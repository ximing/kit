import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import fs from 'fs';

// 获取所有入口点
function getEntryPoints() {
  const srcDir = path.resolve('src');
  const entries = {};

  function walk(dir, prefix = '') {
    if (!fs.existsSync(dir)) {
      return;
    }

    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath, prefix + file + '/');
      } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
        const name = prefix + file.replace('.ts', '');
        entries[name] = fullPath;
      }
    });
  }

  walk(srcDir);
  return entries;
}

const entryPoints = getEntryPoints();

export default {
  input: entryPoints,
  output: {
    dir: 'dist/esm',
    format: 'es',
    entryFileNames: '[name].js',
    sourcemap: true,
    // 禁用代码分割，确保每个文件独立
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.prod.esm.json',
      compilerOptions: {
        declaration: false,
      },
    }),
  ],
  external: [],
  // 防止生成垫片代码
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
};
