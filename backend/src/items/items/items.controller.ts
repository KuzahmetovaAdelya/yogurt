import { Controller, Get, Post, Put, Delete, Body, Param, Injectable, UseInterceptors, UploadedFiles, StreamableFile, Res } from '@nestjs/common';
import { Item } from '../items.entity';
import { ItemsService } from './items.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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

    @Get('streamable')
    async streamable(@Body() name: string,) {
        const file = await this.imagesService.getImage(name);
        // const file = await this.imagesService.getImage("6ff3eb44-39c0-4f9f-b163-246e993f24cf.jpg");
        // console.log(file)
        return file;
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
        console.log(itemData)
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


