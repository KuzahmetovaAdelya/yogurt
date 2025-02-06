import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { Concept } from '../concepts.entity';

@Controller('concepts')
export class ConceptsController {
    constructor(
        private conceptService: ConceptsService
    ) {}

    @Get()
    index(): Promise<Concept[]> {
        return this.conceptService.findAll();
    }

    @Post('create')
    async create(@Body() conceptData: Concept): Promise<any> {
        return this.conceptService.create(conceptData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() conceptData: Concept): Promise<any> {
        conceptData.id = Number(id);
        console.log('Update concept #' + conceptData.id);
        return this.conceptService.update(conceptData);
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.conceptService.delete(id);
    }
}
