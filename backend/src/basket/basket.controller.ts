import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFiles, Query, NotFoundException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';
import { BasketService } from './basket.service';
import { Basket } from './basket.entity';
import { DeleteResult } from 'typeorm';

interface CreateBasketDto {
    userId: number;
    itemId: number;
    count: number;
}

interface UpdateBasketDto {
    id: number;
    userId: number;
    itemId: number;
    count: number;
}

@Controller('basket')
export class BasketController {
    constructor(
        private BasketService: BasketService,
    ) {}

    @Get()
    index(@Query('userId') userId: number): Promise<Basket[]> {
        return this.BasketService.findByUserId(userId);
    }

    @Post('create')
    async create(@Body() createBasketDto: CreateBasketDto): Promise<Basket> {
        const basket = new Basket();
        basket.userId = createBasketDto.userId;
        basket.itemId = createBasketDto.itemId;
        basket.count = createBasketDto.count;
        return await this.BasketService.addToBasket(basket);
    }

    @Put('update')
    async update(@Body() updateBasketDto: UpdateBasketDto): Promise<Basket> {
        const basket = new Basket();
        basket.id = updateBasketDto.id;
        basket.userId = updateBasketDto.userId;
        basket.itemId = updateBasketDto.itemId;
        basket.count = updateBasketDto.count;
        const updated = await this.BasketService.updateBasket(basket);
        if (!updated) {
            throw new NotFoundException(`Basket item with id ${basket.id} not found`);
        }
        return updated;
    }

    @Delete('clear')
    async clearBasket(@Query('userId') userId: number): Promise<DeleteResult> {
        return await this.BasketService.clearBasket(userId);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.BasketService.deleteFromBasket(id);
    }
}