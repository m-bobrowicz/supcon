import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      return false;
    }
    return bcrypt.compare(password, user.hash);
  }

  constructor(private usersService: UserService) {}
}
