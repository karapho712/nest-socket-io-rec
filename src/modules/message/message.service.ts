import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto, user: any) {
    const message = await this.messageRepository.save(
      this.messageRepository.create({
        ...createMessageDto,
        user: user.id,
      }),
    );

    return await this.messageRepository.findOne({
      where: {
        id: message.id,
      },
    });
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }
}
