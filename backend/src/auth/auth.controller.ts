import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/is-public';

@Controller()
export class AuthController {
  @Public()
  @Post('auth/sign-in')
  async signIn() {
    return;
  }
}
