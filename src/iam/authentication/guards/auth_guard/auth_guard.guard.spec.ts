import { AuthGuardGuard } from './access_token_guard.guard';

describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuardGuard()).toBeDefined();
  });
});
