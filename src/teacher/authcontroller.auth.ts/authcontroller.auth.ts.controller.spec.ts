import { Test, TestingModule } from '@nestjs/testing';
import { AuthcontrollerAuthTsController } from './authcontroller.auth.ts.controller';

describe('AuthcontrollerAuthTsController', () => {
  let controller: AuthcontrollerAuthTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthcontrollerAuthTsController],
    }).compile();

    controller = module.get<AuthcontrollerAuthTsController>(AuthcontrollerAuthTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
