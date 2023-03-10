import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sc_conduit_definition' })
export class ConduitDefinition {
  public static of(data: { name: string; author: User; createdAt: Date }) {
    const conduitDefinition = new ConduitDefinition();
    conduitDefinition.author = data.author;
    conduitDefinition.name = data.name;
    conduitDefinition.createdAt = data.createdAt;
    return conduitDefinition;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  author: User;

  @Column()
  createdAt: Date;

  @Column()
  name: string;
}
