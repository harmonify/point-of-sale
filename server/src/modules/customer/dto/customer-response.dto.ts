import { Gender, Customer } from '@prisma/client';

export class CustomerResponseDto implements Partial<Customer> {
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdById: number;
  updatedById: number;
  deletedById: number | null;
  name: string;
  gender: Gender | null;
  phoneNumber: string | null;
  email: string | null;
  description: string | null;
  address: string | null;
}
