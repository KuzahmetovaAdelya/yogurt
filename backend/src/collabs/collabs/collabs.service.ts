import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collab } from '../collabs.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CollabsService {
    constructor(
        @InjectRepository(Collab)
        private collabRepository: Repository<Collab>,
    ) {}

    async findAll(): Promise<Collab[]> {
        return await this.collabRepository.find();
    }

    async create(collab: Collab): Promise<Collab> {
        return await this.collabRepository.save(collab);
    }

    async update(collab: Collab): Promise<UpdateResult> {
        return await this.collabRepository.update(collab.id, collab);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.collabRepository.delete(id);
    }
}
