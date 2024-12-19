export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  isOverdue: boolean;
  priority: number;
  estimate: number;
  startDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'PASSIVE' | 'FIRED';
  assigneeId: string;
  reporterId: string;
  assignee: {
    id: string;
    firstName: string;
    lastName: string;
  };
  reporter: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}
