export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'operator';
    createdAt?: string;
    status?: 'activo' | 'inactivo';
  }
  