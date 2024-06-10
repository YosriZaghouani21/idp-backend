import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  codePostal?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ default: () => 'Date.now()' })
  createdAt?: Date;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  fonction?: string;

  @Column({ type: 'array', default: [] })
  myProject?: ObjectId[];

  @Column({ nullable: true })
  resetLink?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  description?: string;
}
