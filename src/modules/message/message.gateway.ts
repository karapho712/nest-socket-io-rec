import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';
import { Req, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtSocketGuard } from '../auth/guards/jwt-socket.guard';

@UseGuards(JwtSocketGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/api/message',
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @Req() req: any,
  ) {
    const message = await this.messageService.create(
      createMessageDto,
      req.user,
    );

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAllMessages() {
    // const sockets = await this.server.fetchSockets();
    // console.log(sockets.length);
    // sockets.map((socket) => {
    //   console.log(socket.id);
    // });

    const messages = await this.messageService.findAll();

    return messages;
  }
}
