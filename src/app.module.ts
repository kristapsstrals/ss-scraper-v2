import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CategoriesModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
