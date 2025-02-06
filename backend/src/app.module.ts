import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceptsModule } from './concepts/concepts.module';
import { CollabsModule } from './collabs/collabs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ItemsModule,
    ConceptsModule,
    CollabsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
