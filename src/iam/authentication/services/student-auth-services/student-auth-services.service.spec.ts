import { Test, TestingModule } from '@nestjs/testing';
import { StudentAuthServicesService } from './student-auth-services.service';

describe('StudentAuthServicesService', () => {
  let service: StudentAuthServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentAuthServicesService],
    }).compile();

    service = module.get<StudentAuthServicesService>(StudentAuthServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
