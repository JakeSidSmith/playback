import { Config } from '@jakesidsmith/tsb';

const config: Config = {
  main: 'src/index.ts',
  indexHTMLPath: 'src/index.html',
  outDir: 'build',
  tsconfigPath: 'tsconfig.json',
  outputIndexHTMLFor: ['build', 'watch'],
  clearOutDirBefore: ['build', 'watch'],
};

export default config;
