import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Item } from '../items.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(
        private itemsService: ItemsService
    ) {}

    @Get()
    index(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post('create')
    async create(@Body() itemData: Item): Promise<any> {
        return this.itemsService.create(itemData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() itemData: Item): Promise<any> {
        itemData.id = Number(id);
        console.log('Update item #' + itemData.id);
        return this.itemsService.update(itemData);
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.itemsService.delete(id);
    }
}


