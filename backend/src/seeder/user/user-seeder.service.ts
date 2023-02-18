import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

type UserData = Pick<User, 'username' | 'firstName' | 'lastName'> & {
  password: string;
};
@Injectable()
export class UserSeederService {
  private readonly USERS = {
    ADMIN: {
      username: 'admin',
      password: 'Abcd1234',
      firstName: 'Adam',
      lastName: 'Nowak',
    },
  };

  async create(): Promise<void> {
    await this.createIfNotExists(this.USERS.ADMIN);
  }

  private async createIfNotExists(userData: UserData) {
    const isExisting = !!(await this.userService.findOneByUsername(
      userData.username,
    ));
    if (isExisting) {
      return;
    }
    await this.userService.create(this.USERS.ADMIN);
  }

  constructor(private userService: UserService) {}
}
