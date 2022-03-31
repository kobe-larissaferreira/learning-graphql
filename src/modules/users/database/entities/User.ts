import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Field, ObjectType, ID } from "type-graphql";
import { Pet } from "../../../pets/database/entities/Pet";

@Entity("users")
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column({ unique: true })
  @Field()
  email: string;

  password: string;

  @Column()
  @Field() //tirar depois
  password_hash: string;

  @Field(() => [Pet])
  pets: Pet[];

  //faz o hash da senha para permanecer apenas o hash no bd
  @BeforeInsert()
  private async hashPassword() {
    this.password_hash = await bcrypt.hash(this.password, 8);
  }
}
