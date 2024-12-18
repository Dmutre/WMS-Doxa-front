import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';

interface IUseCreateEmployeeMutationProps {
  onSuccess?: (data: EmployeeResponse | void) => void;
  onError?: (error: unknown) => void;
}

export interface ICreateEmployeeProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

interface EmployeeResponse {
  id: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phone: string;
  birthDate: string;
  shiftSchedule: [
    {
      day: number;
      start: string;
      end: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  role: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    isPreset: boolean;
  };
}

// const createEmployee = async ({
//   firstName,
//   lastName,
//   email,
//   password,
//   roleId,
// }: ICreateEmployeeProps) => {
//   const { data } = await axios.post<EmployeeResponse>('users', {
//     firstName,
//     lastName,
//     email,
//     password,
//     roleId,
//   });
//   return data;
// };

export const useCreateEmployeeMutation = (
  args: IUseCreateEmployeeMutationProps = {}
) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['createEmployee'],
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      roleId,
    }: ICreateEmployeeProps) => {
      const { data } = await axios.post<EmployeeResponse>('users', {
        firstName,
        lastName,
        email,
        password,
        roleId,
      });
      return data;
    },
    ...args,
  });
};
