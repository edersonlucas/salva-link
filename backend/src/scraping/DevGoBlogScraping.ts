import Browser from '../utils/Browser';
import ILink from '../interfaces/ILink';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class DevGoBlogScraping {
  static async get() {
    const { page, browser } = await Browser('https://devgo.com.br/');
    try {
      await page.waitForSelector('.blog-featured-container', { timeout: 2000 });
      await page.click('.css-1vyhe0m > button');
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForSelector('.blog-posts-end-card', { timeout: 2000 });
      const links: ILink[] = await page.evaluate(() => {
        const cards = Array.from(
          document.querySelectorAll('.blog-article-card'),
        );
        return cards.map((card) => ({
          title: card.querySelector('h1').textContent,
          link: card.querySelector('a').href,
        }));
      });
      await browser.close();
      return links;
    } catch (err) {
      await browser.close();
      throw new ErrorGenerator(500, 'Internal Server Error');
    }
  }
}
