import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import Category from './category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.service.getCategories();
  }

  @Get(':slug')
  async getCategory(@Param() params): Promise<Category[]> {
    const slug = params.slug;
    return this.service.getCategory(slug);
  }

  //this is a workaround, find a better way!
  @Get(':slug1/:slug2')
  async getCategory1(@Param() params): Promise<Category[]> {
    const slug = `${params.slug1}/${params.slug2}`;
    return this.service.getCategory(slug);
  }
  @Get(':slug1/:slug2/:slug3')
  async getCategory2(@Param() params): Promise<Category[]> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}`;
    return this.service.getCategory(slug);
  }
  @Get(':slug1/:slug2/:slug3/:slug4')
  async getCategory3(@Param() params): Promise<Category[]> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}`;
    return this.service.getCategory(slug);
  }
  @Get(':slug1/:slug2/:slug3/:slug4/:slug5')
  async getCategory4(@Param() params): Promise<Category[]> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}/${params.slug5}`;
    return this.service.getCategory(slug);
  }
}
