import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts/concepts.service';
import { ConceptsController } from './concepts/concepts.controller';

@Module({
  providers: [ConceptsService],
  controllers: [ConceptsController]
})
export class ConceptsModule {}
