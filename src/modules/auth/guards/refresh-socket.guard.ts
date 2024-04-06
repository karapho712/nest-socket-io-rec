import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class RefreshJwtSocketGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new WsException('Unauthorized');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtRefreshTokenKey,
      });
      console.log(payload);
      request['user'] = payload;
    } catch {
      new WsException('Unauthorized');
    }

    return true;
  }

  private extractTokenFromHeader(request: Socket) {
    const [type, token] =
      request.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}