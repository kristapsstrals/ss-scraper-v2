import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private service: ItemsService) {}

  @Get()
  async getItems(
    @Query('category') category: string,
    @Query('page') page?: string,
  ) {
    return this.service.getItems(category, page);
  }
}
