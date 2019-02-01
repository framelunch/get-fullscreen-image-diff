import puppeteer from 'puppeteer';

import { scrollToBottom } from './scrollToBottom';

async function wait(msec: number): Promise<{}> {
  return new Promise(resolve => setTimeout(resolve, msec));
}

export interface Props {
  url: string;
  filename: string;
  width: number;
  height: number;
  user?: string;
  pass?: string;
}

export async function getFullscreenCapture({ url, filename, width, height, user, pass }: Props) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewport({ width, height });

  if (user && pass) {
    const authBuffer = new Buffer(`${user}:${pass}`).toString('base64');
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authBuffer}` });
  }
  await page.goto(url, { waitUntil: 'networkidle2' });

  await wait(5000); // 適当
  await scrollToBottom(page, height);

  await page.screenshot({ path: filename, fullPage: true });
  console.log('save screenshot');
  await browser.close();
}
