import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CollabsService } from './collabs.service';
import { Collab } from '../collabs.entity';

@Controller('collabs')
export class CollabsController {
    constructor(
        private collabsService: CollabsService
    ) {}

    @Get()
    index(): Promise<Collab[]> {
        return this.collabsService.findAll();
    }

    @Post('create')
    async create(@Body() collabData: Collab): Promise<any> {
        return this.collabsService.create(collabData);
    }

    @Put(':id/update')
    async update(@Param('id') id: any, @Body() collabData: Collab): Promise<any> {
        collabData.id = Number(id);
        console.log('Update collab #' + collabData.id);
        return this.collabsService.update(collabData);
    }

    @Delete(':id/delete') 
    async delete(@Param('id') id: any): Promise<any> {
        return this.collabsService.delete(id);
    }
}
