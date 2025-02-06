import { Test, TestingModule } from '@nestjs/testing';
import { CollabsService } from './collabs.service';

describe('CollabsService', () => {
  let service: CollabsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabsService],
    }).compile();

    service = module.get<CollabsService>(CollabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
