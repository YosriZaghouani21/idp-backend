import { ObjectId } from 'mongodb';
export class UserM {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  password?: string;
  address?: string;
  birthDate?: Date;
  codePostal?: string;
  country?: string;
  city?: string;
  Role?: string;
  createdAt?: Date;
  image?: string;
  Fonction?: string;
  myProject?: ObjectId[];
  myRepo?: ObjectId[];
  resetLink?: string;
  status?: string;
  description?: string;
  hashRefreshToken?: string;
}
