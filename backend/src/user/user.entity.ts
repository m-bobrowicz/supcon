import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'scuser' })
export class User {
  public static of(data: { username: string; hash: string }): User {
    const user = new User();
    user.username = data.username;
    user.hash = data.hash;
    return user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
