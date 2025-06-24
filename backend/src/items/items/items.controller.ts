import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Item } from '../items.entity';
import { ItemsService } from './items.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';

@Controller('items')
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private imagesService: ImagesService
    ) {}

    @Get()
    index(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post('create')    
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() itemData: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
        let filesArr: string[] = [];
        for (let i: number = 0; i < files.length; i++) {
            let filename: string = await this.imagesService.createImage(files[i]);
            filesArr.push(filename);
        }
        console.log(filesArr)
        itemData['image'] = filesArr
        return this.itemsService.create(itemData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() itemData: Item): Promise<any> {
        itemData.id = Number(id);
        return this.itemsService.update(itemData);
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.itemsService.delete(id);
    }

    @Get(':id/get')
    async getOne(@Param('id') id:number): Promise<any> {
        return this.itemsService.findOne(id)
    }
}


