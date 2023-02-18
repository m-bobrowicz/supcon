import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserSeederService {
  private readonly USERS = {
    ADMIN: { username: 'admin', password: 'Abcd1234' },
  };

  create(): Promise<void> {
    return this.userService.create(this.USERS.ADMIN);
  }

  constructor(private userService: UserService) {}
}
