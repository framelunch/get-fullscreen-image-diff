import puppeteer from 'puppeteer';

export async function scrollToBottom(page: puppeteer.Page, viewportHeight: number) {
  const getScrollHeight = () => Promise.resolve(document.documentElement.scrollHeight);
  let scrollHeight = await page.evaluate(getScrollHeight);
  let currentPosition = 0;
  let scrollNumber = 0;

  while (currentPosition < scrollHeight) {
    scrollNumber += 1;
    const nextPosition = scrollNumber * viewportHeight;
    await page.evaluate(scrollTo => Promise.resolve(window.scrollTo(0, scrollTo)), nextPosition);
    await page
      .waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 })
      .catch(e => console.log('timeout exceed. proceed to next operation'));

    currentPosition = nextPosition;
    console.log(`scrollNumber: ${scrollNumber}`);
    console.log(`currentPosition: ${currentPosition}`);

    // 2
    scrollHeight = await page.evaluate(getScrollHeight);
    console.log(`ScrollHeight ${scrollHeight}`);
  }
}
