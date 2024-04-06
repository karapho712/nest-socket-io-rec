import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req: Request & { user: object }) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
