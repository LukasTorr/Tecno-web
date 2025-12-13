import { Usuario } from './usuario.model';

describe('Usuario interface', () => {
  it('should create a valid Usuario object', () => {
    const user: Usuario = {
      id: 1,
      email: 'test@example.com',
      password: '123456',
      rol: 'cliente',
      nombre: 'Ana',
      apellido: 'G',
    };

    expect(user).toBeTruthy();
  });
});
