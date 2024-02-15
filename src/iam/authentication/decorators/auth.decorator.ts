import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enum/auth.type';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
