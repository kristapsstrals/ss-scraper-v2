import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

const URL: string = 'https://www.ss.lv';

@Injectable()
export class ItemsService {
  async getItems(category: string, page?: string): Promise<any> {
    try {
      let url = `${URL}/lv/${category}`;
      if (page) url = `${url}/page${page}.html`;
      const $ = await this.fetchData(url);
      const dataTable = $('#filter_frm > table:nth-child(3) > tbody');

      console.log(dataTable);

      const children = dataTable.children();

      let items: any[] = [];

      children.each((i, e) => {
        if (i === 0) return true;

        let item: any = {};
        e.children.forEach((ele, ind) => {
          const child = ele.firstChild;

          const data = this.getData(child);
          if (data) item[`item${ind}`] = data;
        });

        items.push(item);
      });

      return items;
    } catch (error) {
      console.log('could not scrape items');
      console.error(error);
      throw error;
    }
  }

  private async fetchData(url: string): Promise<CheerioStatic> {
    console.log(`Fetching data from ${url}`);
    const result = await axios.get(url);
    return load(result.data);
  }

  private getData(cheerioElement: CheerioElement) {
    if (!cheerioElement) return null;

    if (cheerioElement.type === 'text') return cheerioElement.data;

    // if (!cheerioElement.firstChild) {
    //   console.log(cheerioElement);
    // }

    return this.getData(cheerioElement.firstChild);
  }
}
