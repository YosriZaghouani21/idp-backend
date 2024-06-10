import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'mongodb',
    uri: config.getDatabaseHost(),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'], // Adjust the path if necessary
    // options: {
    //   user: config.getDatabaseUser(),
    //   pass: config.getDatabasePassword(),
    //   dbName: config.getDatabaseName(),
    // },
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigService],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
