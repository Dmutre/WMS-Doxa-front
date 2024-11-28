export interface Warehouse {
  id: string;
  name: string;
  type: string;
  address: string;
  coordinates: string;
  notes: string;
  area: number;
  isActive: boolean;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}
