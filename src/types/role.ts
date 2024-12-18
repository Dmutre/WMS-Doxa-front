export interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isPreset: boolean;
  permissions: string[];
}