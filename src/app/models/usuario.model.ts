import { MetodoPago } from './metodo-pago.model';

export interface Usuario {
  id: number;
  email: string;
  password: string;
  rol: 'admin' | 'cliente';
  foto?: string; // URL de la foto de perfil (opcional)
  nombre?: string;
  apellido?: string;
  metodosPago?: MetodoPago[];
}
