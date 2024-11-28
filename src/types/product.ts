export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  barcode: string;
  weight: number;
  dimensions: string;
  category: string;
  manufacturer: string;
  expirationDate: Date;
  warrantyPeriod: number;
  originCountry: string;
  photoUrl: string[];
  createdAt: Date;
  updatedAt: Date;
}
