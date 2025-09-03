export interface Patient {
  _id?: string;
  name: string;
  email: string;
  password: string;
  rut?: string;
  phone?: string;
  gender?: string;
  address?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
