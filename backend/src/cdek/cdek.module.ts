import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CdekController } from './cdek.controller';
import { CdekService } from './cdek.service';

@Module({
    imports: [HttpModule],
    controllers: [CdekController],
    providers: [CdekService],
})
export class CdekModule {} 