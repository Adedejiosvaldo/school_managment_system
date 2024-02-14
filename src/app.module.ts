import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dbConfig from './config/db.config';

// const config: ConfigService = undefined;
// console.log(process.env.DATABASE);
// console.log(config.get('DATABASE'));

@Module({
  imports: [
    IamModule,
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),

        autoLoadEntities: configService.get('AUTO_LOAD_ENTITIES'),
        synchronize:
          configService.get('NODE_ENV') === 'dev'
            ? configService.get('SYNC_DEV')
            : configService.get('SYNC_PROD'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //   constructor(
  //     @Inject(dbConfig.KEY)
  //     private readonly dbConfig:ConfigType<type of dbConfig> :
  //   );
}
