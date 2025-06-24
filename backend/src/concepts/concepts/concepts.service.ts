import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concept } from '../concepts.entity';

@Injectable()
export class ConceptsService {
    private readonly logger = new Logger(ConceptsService.name);

    constructor(
        @InjectRepository(Concept)
        private conceptRepository: Repository<Concept>
    ) {}

    async findAll(): Promise<Concept[]> {
        return this.conceptRepository.find();
    }

    async findOne(id: number): Promise<Concept> {
        this.logger.debug(`Finding concept with ID ${id}`);
        const concept = await this.conceptRepository.findOne({ where: { id } });
        if (!concept) {
            this.logger.warn(`Concept with ID ${id} not found`);
            throw new NotFoundException(`Concept with ID ${id} not found`);
        }
        return concept;
    }

    async create(concept: Concept): Promise<Concept> {
        return this.conceptRepository.save(concept);
    }

    async update(concept: Concept): Promise<Concept> {
        try {
            this.logger.debug(`Updating concept with ID ${concept.id}`);
            this.logger.debug('Update data:', JSON.stringify(concept, null, 2));

            if (!concept.id) {
                throw new BadRequestException('Concept ID is required for update');
            }

            // Check if concept exists
            const existingConcept = await this.findOne(concept.id);
            if (!existingConcept) {
                throw new NotFoundException(`Concept with ID ${concept.id} not found`);
            }

            // Update only the fields that are provided
            const updatedConcept = {
                ...existingConcept,
                name: concept.name || existingConcept.name,
                price: concept.price || existingConcept.price,
                image: concept.image || existingConcept.image
            };

            this.logger.debug('Saving updated concept:', JSON.stringify(updatedConcept, null, 2));
            return this.conceptRepository.save(updatedConcept);
        } catch (error) {
            this.logger.error('Error updating concept:', error);
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        return this.conceptRepository.delete(id);
    }
}
