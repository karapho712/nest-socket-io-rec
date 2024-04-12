import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Message } from './message.entity';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule, UserModule],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
