export interface EmployeesDto {
  data: EmployeeDto[];
  total: number;
}

export interface EmployeeDto {
  id: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
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
