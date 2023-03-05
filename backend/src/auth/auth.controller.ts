import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/sign-in')
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.login((req as any).user);
    response.cookie('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/who-am-i')
  async getProfile(@Req() req: Request) {
    const reqUser = req.user as { userId: number; username: string };
    const user = await this.userService.findOneByUsername(reqUser.username);
    return {
      id: user?.id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
  }

  @Post('auth/sign-out')
  async signOut(@Res() response: Response) {
    response
      .clearCookie('token', {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,
      })
      .status(HttpStatus.NO_CONTENT)
      .json({
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
      });
  }

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
}
