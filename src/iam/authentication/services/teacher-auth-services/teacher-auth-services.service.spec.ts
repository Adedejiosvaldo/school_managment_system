import { Test, TestingModule } from '@nestjs/testing';
import { TeacherAuthServicesService } from './teacher-auth-services.service';

describe('TeacherAuthServicesService', () => {
  let service: TeacherAuthServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherAuthServicesService],
    }).compile();

    service = module.get<TeacherAuthServicesService>(TeacherAuthServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
