import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorsService } from './providers.service';

describe('ConnectorsService', () => {
  let service: ConnectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectorsService],
    }).compile();

    service = module.get<ConnectorsService>(ConnectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
