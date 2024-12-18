export interface EmployeesDto {
  data: Employee[];
  total: number;
}

export interface Employee {
  id: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: USER_STATUS;
  phone: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isPreset: boolean;
}

export enum USER_STATUS {
  ACTIVE = 'active',
  PASSIVE = 'passive',
  FIRED = 'fired',
}
