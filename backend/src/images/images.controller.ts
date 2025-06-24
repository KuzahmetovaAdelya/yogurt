import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.imagesService.createImage(file);
    }

    @Get(':name')
    async getImage(@Param('name') name: string, @Res() res: Response) {
        await this.imagesService.getImage(name, res);
    }

    @Delete(':name')
    async deleteImage(@Param('name') name: string) {
        return this.imagesService.deleteImage(name);
    }
}
