import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      return null;
    }
    if (await bcrypt.compare(password, user.hash)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async changePassword(payload: {
    username: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const { username, currentPassword, newPassword } = payload;
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      throw new Error('user does not exist');
    }
    const result = await bcrypt.compare(currentPassword, user.hash);
    if (result) {
      await this.usersService.updatePassowrd({
        username,
        password: newPassword,
      });
      return null;
    }
    throw new Error('password is incorrect');
  }

  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}
}
