import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import Category from './category.interface';
import ApiError from 'src/common/error.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.service.getCategories();
  }

  @Get(':slug')
  async getCategory(@Param() params): Promise<Category[] | ApiError> {
    const slug = params.slug;
    console.log('depth 0');
    return this.getCategoryOrError(slug);
  }

  //this is a workaround, find a better way!
  @Get(':slug1/:slug2')
  async getCategory1(@Param() params): Promise<Category[] | ApiError> {
    const slug = `${params.slug1}/${params.slug2}`;
    console.log('depth 1');
    return this.getCategoryOrError(slug);
  }
  @Get(':slug1/:slug2/:slug3')
  async getCategory2(@Param() params): Promise<Category[] | ApiError> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}`;
    console.log('depth 2');
    return this.getCategoryOrError(slug);
  }
  @Get(':slug1/:slug2/:slug3/:slug4')
  async getCategory3(@Param() params): Promise<Category[] | ApiError> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}`;
    console.log('depth 3');
    return this.getCategoryOrError(slug);
  }
  @Get(':slug1/:slug2/:slug3/:slug4/:slug5')
  async getCategory4(@Param() params): Promise<Category[] | ApiError> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}/${params.slug5}`;
    console.log('depth 4');
    return this.getCategoryOrError(slug);
  }
  @Get(':slug1/:slug2/:slug3/:slug4/:slug5/:slug6')
  async getCategory5(@Param() params): Promise<Category[] | ApiError> {
    const slug = `${params.slug1}/${params.slug2}/${params.slug3}/${params.slug4}/${params.slug5}/${params.slug6}`;
    return this.getCategoryOrError(slug);
  }

  async getCategoryOrError(slug: string): Promise<Category[] | ApiError> {
    try {
      var categories = await this.service.getCategory(slug);
      console.log(categories);
      if (!categories || !categories.length)
        return {
          message: `No categories present for slug [${slug}]. Could be last category level.`,
        };

      return categories;
    } catch (error) {
      var err: ApiError = {
        message: 'Internal server error',
        error,
      };
      return err;
    }
  }
}
