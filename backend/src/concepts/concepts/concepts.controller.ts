import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors, Logger, BadRequestException } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { Concept } from '../concepts.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';

@Controller('concepts')
export class ConceptsController {
    private readonly logger = new Logger(ConceptsController.name);

    constructor(
        private conceptService: ConceptsService,
        private imagesService: ImagesService
    ) {}

    @Get()
    index(): Promise<Concept[]> {
        return this.conceptService.findAll();
    }

    @Get(':id/get')
    async getOne(@Param('id') id: number): Promise<Concept> {
        const concept = await this.conceptService.findOne(id);
        if (!concept) {
            throw new BadRequestException(`Concept with ID ${id} not found`);
        }
        return concept;
    }

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() conceptData: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
        let filesArr: string[] = [];
        for (let i: number = 0; i < files.length; i++) {
            let filename: string = await this.imagesService.createImage(files[i]);
            filesArr.push(filename);
        }
        console.log(filesArr)
        conceptData['image'] = filesArr
        return this.conceptService.create(conceptData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() conceptData: any): Promise<any> {
        try {
            // Validate required fields
            if (!conceptData.name || !conceptData.price) {
                throw new BadRequestException('Name and price are required');
            }

            // Create a properly formatted concept object
            const formattedConcept: Concept = {
                id: Number(id),
                name: conceptData.name,
                price: Number(conceptData.price),
                image: conceptData.image || ''
            };

            this.logger.debug('Formatted concept data:', JSON.stringify(formattedConcept, null, 2));
            
            const result = await this.conceptService.update(formattedConcept);
            this.logger.debug('Update result:', result);
            return result;
        } catch (error) {
            this.logger.error('Error updating concept:', error);
            throw error;
        }
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.conceptService.delete(id);
    }
}
