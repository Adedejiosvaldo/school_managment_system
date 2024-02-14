import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USERNAME: process.env.USERNAME,
    AUTO_LOAD_ENTITIES: process.env.AUTO_LOAD_ENTITIES,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    SYNC:
      process.env.NODE_ENV === 'dev'
        ? process.env.SYNC_DEV
        : process.env.SYNC_PROD,
  };
});
