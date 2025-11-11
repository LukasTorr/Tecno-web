export interface Usuario {
  id: number;
  email: string;
  password: string;
  rol: 'admin' | 'cliente';
}
