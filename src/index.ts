import puppeteer from 'puppeteer';

import { scrollToBottom } from './scrollToBottom';

async function wait(msec: number): Promise<{}> {
  return new Promise(resolve => setTimeout(resolve, msec));
}

async function getScreenshot(page: puppeteer.Page) {
  await page.screenshot({ path: 'testing-blog.png', fullPage: true });
  console.log('save screenshot');
}

async function main() {
  const viewportWidth = 1200;
  const viewportHeight = 800;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewport({ width: viewportWidth, height: viewportHeight });
  await page.setExtraHTTPHeaders({
    Authorization: `asic ${new Buffer('sbi:test').toString('base64')}`,
  });
  // await page.goto('https://www.nict.go.jp/JST/JST5.html', { waitUntil: 'networkidle2' });
  // await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
  // await page.goto('http://sbi.framelunch.com/business/', { waitUntil: 'networkidle2' });
  // await page.goto('https://contents.netbk.co.jp/business/', { waitUntil: 'networkidle2' });
  await page.goto('http://localhost:9012/business/', { waitUntil: 'networkidle2' });

  await wait(5000); // 適当
  await scrollToBottom(page, viewportHeight);

  await getScreenshot(page);
  await browser.close();
}

main()
  .then(() => console.log('end'))
  .catch(e => console.error(e));
