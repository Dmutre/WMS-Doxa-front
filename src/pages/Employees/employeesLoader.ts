import { EmployeesDto } from '../../types/employee';
import { LoaderFunction } from 'react-router';

export const employeesLoader: LoaderFunction = ({ request }): EmployeesDto => {
  const data = [];
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page')!, 10);
  const pageSize = parseInt(url.searchParams.get('pageSize')!, 10);

  for (let i = 1; i <= 100; i++) {
    data.push({
      id: `${i}`,
      firstName: `${i}`,
      lastName: 'Johnson',
      status: 'active',
      phone: '(066) 745-12-33',
      email: 'fejnwkf@gmail.com',
      birthDate: '2024-11-03T18:45:49.375Z',
      roleId: '',
      createdAt: '',
      updatedAt: '',
      role: {
        id: '',
        name: 'asdf',
        createdAt: '',
        updatedAt: '',
        isPreset: false,
      },
    });
  }
  return {
    data: data.slice(page * pageSize, page * pageSize + pageSize),
    total: 1000,
  };
};
