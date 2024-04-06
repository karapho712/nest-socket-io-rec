import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      ...dataSourceOptions,
      useFactory: () => ({ autoLoadEntities: true }),
      dataSourceFactory: async () => await dataSource.initialize(),
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
