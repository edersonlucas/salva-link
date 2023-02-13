import Browser from '../utils/Browser';
import ILink from '../interfaces/ILink';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class TrybeBlogScraping {
  static async get() {
    const { page, browser } = await Browser('https://blog.betrybe.com/');
    try {
      await page.waitForSelector('.cs-container', { timeout: 15000 });
      const links: ILink[] = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.entry-preview'));
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
