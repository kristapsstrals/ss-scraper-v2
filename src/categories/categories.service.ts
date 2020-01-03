import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';
import Category from './category.interface';

const URL: string = 'https://www.ss.lv';

@Injectable()
export class CategoriesService {
  async getCategories(): Promise<Category[]> {
    try {
      const $ = await this.fetchData(URL);
      const heads = $('#main_img_div > div.main_head > div > h2 > a');

      let categories: Category[] = [];

      heads.each((i, e) => {
        //each here should be `a`
        const href = e.attribs['href'];
        const title = e.attribs['title'];
        const slug = href.replace(/\\|\//g, '').replace('lv', '');

        categories.push({ title, slug });
      });

      return categories;
    } catch (error) {
      console.log('could not scrape categories');
      console.error(error);
      throw error;
    }
  }

  async getCategory(slug: string): Promise<Category[]> {
    try {
      const $ = await this.fetchData(`${URL}/lv/${slug}/`);
      const head = $('.a_category');
      let categories: Category[] = [];

      for (let i = 0; i < head.length; i++) {
        const a = head[i];
        const href = a.attribs['href'];
        const title = a.attribs['title'];
        const sl = href
          .replace(slug, '')
          .replace('lv', '')
          .replace(/\\|\//g, '');

        categories.push({ title, slug: sl });
      }

      return categories;
    } catch (error) {
      console.log(`could not scrape category: ${slug}`);
      console.error(error);
      throw error;
    }
  }

  private async fetchData(url: string): Promise<CheerioStatic> {
    console.log(`Fetching data from ${url}`);
    const result = await axios.get(url);
    return load(result.data);
  }

  private getData(element: CheerioElement): string | null {
    if (element.type === 'text') return element.data;

    if (!element.firstChild) return null;

    return this.getData(element.firstChild);
  }
}
