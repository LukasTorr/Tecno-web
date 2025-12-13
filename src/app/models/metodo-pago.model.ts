export interface MetodoPago {
  id: string;
  tipo: string;
  ultima4: string; // enmascarado: **** **** **** 1234
  titular: string;
  creadoEl: string;
  expiracion: string; // MM/YY
  icono?: string;
}
