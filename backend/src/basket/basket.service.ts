import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './basket.entity';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketRepository: Repository<Basket>
    ) {}

    async addToBasket(basket: Basket): Promise<Basket> {
        return await this.basketRepository.save(basket);
    }

    async deleteFromBasket(id: number): Promise<DeleteResult> {
        return await this.basketRepository.delete(id);
    }

    async updateBasket(basket: Basket): Promise<Basket | null> {
        await this.basketRepository.update(basket.id, basket);
        const updatedBasket = await this.basketRepository.findOne({ 
            where: { id: basket.id },
            relations: ['item']
        });
        return updatedBasket;
    }

    async findByUserId(userId: number): Promise<Basket[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return await this.basketRepository.find({
            where: { userId },
            relations: {
                item: true
            }
        });
    }

    async clearBasket(userId: number): Promise<DeleteResult> {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return await this.basketRepository.delete({ userId });
    }
}
