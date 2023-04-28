import { Config } from '@jakesidsmith/tsb';

const config: Config = {
  main: 'src/index.tsx',
  indexHTMLPath: 'src/index.html',
  outDir: 'build',
  tsconfigPath: 'tsconfig.json',
  outputIndexHTMLFor: ['build', 'watch'],
  clearOutDirBefore: ['build', 'watch'],
  https: true,
};

export default config;
