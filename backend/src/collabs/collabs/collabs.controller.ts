import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors, Logger, BadRequestException } from '@nestjs/common';
import { CollabsService } from './collabs.service';
import { Collab } from '../collabs.entity';
import { ImagesService } from 'src/images/images.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('collabs')
export class CollabsController {
    private readonly logger = new Logger(CollabsController.name);

    constructor(
        private collabsService: CollabsService,
        private imagesService: ImagesService
    ) {}

    @Get()
    index(): Promise<Collab[]> {
        return this.collabsService.findAll();
    }

    @Get(':id/get')
    async getOne(@Param('id') id: number): Promise<Collab> {
        // this.logger.debug(`Getting collab with ID ${id}`);
        const collab = await this.collabsService.findOne(id);
        if (!collab) {
            throw new BadRequestException(`Collab with ID ${id} not found`);
        }
        return collab;
    }

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() collabData: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
        let filesArr: string[] = [];
        for (let i: number = 0; i < files.length; i++) {
            let filename: string = await this.imagesService.createImage(files[i]);
            filesArr.push(filename);
        }
        console.log(filesArr)
        collabData['image'] = filesArr
        return this.collabsService.create(collabData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() collabData: any): Promise<any> {
        try {
            // this.logger.debug(`Received update request for collab #${id}`);
            // this.logger.debug('Raw update data:', JSON.stringify(collabData, null, 2));

            // Validate required fields
            if (!collabData.name || !collabData.description) {
                throw new BadRequestException('Name and description are required');
            }

            // Create a properly formatted collab object
            const formattedCollab: Collab = {
                id: Number(id),
                name: collabData.name,
                description: collabData.description,
                instagram: collabData.instagram || '',
                telegram: collabData.telegram || '',
                vkontakte: collabData.vkontakte || '',
                youtube: collabData.youtube || '',
                image: collabData.image || ''
            };

            this.logger.debug('Formatted collab data:', JSON.stringify(formattedCollab, null, 2));
            
            const result = await this.collabsService.update(formattedCollab);
            this.logger.debug('Update result:', result);
            return result;
        } catch (error) {
            this.logger.error('Error updating collab:', error);
            throw error;
        }
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.collabsService.delete(id);
    }
}
