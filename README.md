Regal Cinemas

Regal Cinemas es una plataforma integral de gestión cinematográfica diseñada para ofrecer una experiencia de usuario fluida y una administración potente. Desde la selección dinámica de asientos hasta la compra integrada de snacks y la gestión avanzada de salas, este sistema cubre todo el flujo operativo de un cine moderno.
Características Principales
Experiencia del Cliente

    Reservas Inteligentes: Selección de asientos en tiempo real con bloqueo visual de disponibilidad por función.

    Catálogo de Snacks Dinámico: Interfaz inmersiva para selección de confitería con actualización automática de colores basada en el producto.

    Carrito de Compras Unificado: Proceso de pago único que integra tickets de cine y productos de cafetería.

    Perfil de Usuario: Gestión de métodos de pago (Tarjetas de Crédito/Débito) e historial detallado de reservas con soporte para moneda local en CLP.

Panel de Administración

    Gestión de Salas: Configuración técnica de salas (IMAX, VIP, Estándar) definiendo dimensiones de filas, columnas y precios base.

    Control de Inventario: CRUD completo para el catálogo de snacks, permitiendo ajustar precios y stock en tiempo real.

    Administración de Usuarios: Control centralizado de perfiles y roles del sistema.

Tecnologías Utilizadas

    Frontend: Angular 15.2.11.

    Lenguaje: TypeScript.

    Estilos: Bootstrap 5 y CSS3 personalizado.

    Estado y Persistencia: RxJS (BehaviorSubjects) para el carrito y LocalStorage/SessionStorage para persistencia de datos local.

    Internacionalización: Soporte nativo para moneda chilena (es-CL).

Instalación y Configuración

Para poner en marcha el proyecto localmente, sigue estos pasos:

    Clonar el repositorio:
    Bash

git clone https://github.com/tu-usuario/ProyectoCine.git
cd ProyectoCine

Instalar dependencias:
Bash

npm install

Servidor de desarrollo: Ejecuta el siguiente comando y navega a http://localhost:4200/.
Bash

ng serve
