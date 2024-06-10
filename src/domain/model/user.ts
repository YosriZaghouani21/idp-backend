export class Image {
  public_id: string;
  url: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  address: string;
  birthDate: string;
  codePostal: string;
  country: string;
  city: string;
  Role: string;
  createdAt: Date;
  image: Image;
  Fonction: string;
  myProject: string[];
  myRepo: string[];
  resetLink: string;
  status: string;
  description: string;
}
