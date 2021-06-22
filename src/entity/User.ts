import 'reflect-metadata';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column('bool', { default: false })
  confirmed: boolean;
}
