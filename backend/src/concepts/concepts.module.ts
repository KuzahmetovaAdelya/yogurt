import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts/concepts.service';
import { ConceptsController } from './concepts/concepts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from './concepts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concept])
  ],
  providers: [ConceptsService],
  controllers: [ConceptsController]
})
export class ConceptsModule {}
