import { Module } from '@nestjs/common';
import { CollabsController } from './collabs/collabs.controller';
import { CollabsService } from './collabs/collabs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collab } from './collabs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collab])
  ],
  controllers: [CollabsController],
  providers: [CollabsService]
})
export class CollabsModule {}
