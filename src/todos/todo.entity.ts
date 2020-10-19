import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  author: ObjectID;

  @Column()
  description: string;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createAt: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updateAt: string;
}
