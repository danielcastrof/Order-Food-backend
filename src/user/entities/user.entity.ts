/* eslint-disable prettier/prettier */

import { Role } from "@prisma/client";
export class User {
  readonly id?: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  status: boolean;
  points: number;
  role?: Role;
}

