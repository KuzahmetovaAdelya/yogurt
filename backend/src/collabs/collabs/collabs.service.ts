import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collab } from '../collabs.entity';

@Injectable()
export class CollabsService {
    private readonly logger = new Logger(CollabsService.name);

    constructor(
        @InjectRepository(Collab)
        private collabsRepository: Repository<Collab>
    ) {}

    async findAll(): Promise<Collab[]> {
        return this.collabsRepository.find();
    }

    async findOne(id: number): Promise<Collab> {
        this.logger.debug(`Finding collab with ID ${id}`);
        const collab = await this.collabsRepository.findOne({ where: { id } });
        if (!collab) {
            this.logger.warn(`Collab with ID ${id} not found`);
            throw new NotFoundException(`Collab with ID ${id} not found`);
        }
        return collab;
    }

    async create(collab: Collab): Promise<Collab> {
        return this.collabsRepository.save(collab);
    }

    async update(collab: Collab): Promise<Collab> {
        try {
            this.logger.debug(`Updating collab with ID ${collab.id}`);
            this.logger.debug('Update data:', JSON.stringify(collab, null, 2));

            if (!collab.id) {
                throw new BadRequestException('Collab ID is required for update');
            }

            // Check if collab exists
            const existingCollab = await this.findOne(collab.id);
            if (!existingCollab) {
                throw new NotFoundException(`Collab with ID ${collab.id} not found`);
            }

            // Update only the fields that are provided
            const updatedCollab = {
                ...existingCollab,
                name: collab.name || existingCollab.name,
                description: collab.description || existingCollab.description,
                instagram: collab.instagram || existingCollab.instagram,
                telegram: collab.telegram || existingCollab.telegram,
                vkontakte: collab.vkontakte || existingCollab.vkontakte,
                youtube: collab.youtube || existingCollab.youtube,
                image: collab.image || existingCollab.image
            };

            this.logger.debug('Saving updated collab:', JSON.stringify(updatedCollab, null, 2));
            return this.collabsRepository.save(updatedCollab);
        } catch (error) {
            this.logger.error('Error updating collab:', error);
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        return this.collabsRepository.delete(id);
    }
}
