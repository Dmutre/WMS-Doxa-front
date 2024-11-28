export interface Batch {
  id: string;
  warehouseId: string;
  itemId: string;
  quantity: number;
  row: number;
  shelf: number;
  position: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  receivedAt: Date;
  expiryDate: Date;
  isReserved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
