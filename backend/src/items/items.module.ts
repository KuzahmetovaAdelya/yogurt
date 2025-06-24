import { Module } from '@nestjs/common';
import { ItemsService } from './items/items.service';
import { ItemsController } from './items/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        ImagesModule
    ],
    providers: [ItemsService],
    controllers: [ItemsController],
})
export class ItemsModule {}
