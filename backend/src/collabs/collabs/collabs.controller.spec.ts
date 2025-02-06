import { Test, TestingModule } from '@nestjs/testing';
import { CollabsController } from './collabs.controller';

describe('CollabsController', () => {
  let controller: CollabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollabsController],
    }).compile();

    controller = module.get<CollabsController>(CollabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
