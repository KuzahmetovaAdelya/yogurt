import { Injectable } from '@nestjs/common';
import { Concept } from '../concepts.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConceptsService {
    constructor(
        @InjectRepository(Concept)
        private conceptRepository: Repository<Concept>,
    ) {}

    async findAll(): Promise<Concept[]> {
        return await this.conceptRepository.find();
    }

    async create(concept: Concept): Promise<Concept> {
        return await this.conceptRepository.save(concept);
    }

    async update(concept: Concept): Promise<UpdateResult> {
        return await this.conceptRepository.update(concept.id, concept);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.conceptRepository.delete(id);
    }
}
