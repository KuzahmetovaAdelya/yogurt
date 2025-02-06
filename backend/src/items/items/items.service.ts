import { Injectable } from '@nestjs/common';
import { Item } from '../items.entity';
import { Repository, UpdateResult, DeleteResult, FindOptionsWhere, ObjectId } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) {}

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async create(item: Item): Promise<Item> {
        return await this.itemRepository.save(item);
    }

    async update(item: Item): Promise<UpdateResult> {
        return await this.itemRepository.update(item.id, item);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.itemRepository.delete(id);
    }
}
