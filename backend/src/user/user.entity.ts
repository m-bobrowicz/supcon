import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'scuser' })
export class User {
  public static of(data: {
    username: string;
    hash: string;
    firstName?: string | null;
    lastName?: string | null;
  }): User {
    const user = new User();
    user.username = data.username;
    user.hash = data.hash;
    user.firstName = (data.firstName ?? null) as string;
    user.lastName = (data.lastName ?? null) as string;
    return user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ default: true })
  isActive: boolean;
}
