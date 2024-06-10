import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';
// import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      ignoreEnvFile:
        process.env.NODE_ENV ===
          'mongodb+srv://yosri:XympO44V7qQoumfS@idp.i24g5rc.mongodb.net/' ||
        process.env.NODE_ENV === ''
          ? false
          : true,
      isGlobal: true,
      // validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
