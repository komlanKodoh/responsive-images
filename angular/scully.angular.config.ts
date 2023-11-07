import '@scullyio/scully-plugin-puppeteer';
import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */


export const config: ScullyConfig = {
  puppeteerLaunchOptions: {
    executablePath: "/bin/chromium-browser"
  },
  projectRoot: "./src",
  projectName: "angular",
  spsModulePath: 'YOUR OWN MODULE PATH HERE',
  outDir: '../static/pages',
  routes: {
  }
};