import puppeteer, { Page as PageType, Browser as BrowserType } from 'puppeteer';

export default async function Browser(URL: string): Promise<{
  page: PageType;
  browser: BrowserType;
}> {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto(URL);
  return {
    page,
    browser,
  };
}
