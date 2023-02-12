import Browser from '../utils/Browser';
import ILink from '../interfaces/ILink';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class TecnoBlogScraping {
  static async get() {
    const { page, browser } = await Browser(
      'https://tecnoblog.net/tema/tecnoblog/',
    );
    try {
      await page.waitForSelector('.tb-hub-module-title', { timeout: 4000 });
      const links: ILink[] = await page.evaluate(() => {
        const cards = Array.from(
          document.querySelectorAll('.article-destaque'),
        );
        return cards.map((card) => ({
          title: card.querySelector('h2').textContent,
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
