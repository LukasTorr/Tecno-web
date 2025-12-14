import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';
import { MetodosPagoService } from '../../services/metodos-pago.service';
import { AuthService } from '../../services/auth.service';
import { MetodoPago } from '../../models/metodo-pago.model';
// 🔑 Importar interfaces y servicio de reserva
import { ReservationService, TempReservation } from '../../services/reserva/reservation.service'; 


@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {
  items: any[] = [];
  total = 0; // Total de snacks
  @Output() close = new EventEmitter<void>();

  metodosPago: MetodoPago[] = [];
  showPaymentModal: boolean = false;
  selectedMetodo: MetodoPago | null = null;
  usuarioEmail: string = '';

  // 🔑 Datos de la reserva de asientos para mostrar en el modal
  tempReserva: TempReservation | null = null;
  totalReservaAsientos: number = 0;


  constructor(
    private cartService: CartService,
    private metodosPagoService: MetodosPagoService,
    private authService: AuthService,
    private reservationService: ReservationService // 🔑 INYECTAR
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.usuarioEmail = usuario.email;
      this.cargarMetodosPago(usuario.email);
    }

    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal(); // Este es el total de SNACKS
      // 🔑 CARGAR DATOS TEMPORALES CADA VEZ QUE EL CARRITO CAMBIE
      this.loadTempReservation(); 
    });
    
    this.metodosPagoService.metodosPago$.subscribe(metodos => {
        if (metodos) this.metodosPago = metodos;
    });

    // Cargar inicialmente por si la suscripción de items tarda
    this.loadTempReservation(); 
  }

  loadTempReservation() {
    this.tempReserva = this.reservationService.getTempReservation();
    this.totalReservaAsientos = this.tempReserva ? this.tempReserva.totalAsientos : 0;
  }

  cargarMetodosPago(email: string) {
    this.metodosPagoService.cargarMetodos(email);
  }

  // 🔑 FUNCIONES HECHAS PÚBLICAS PARA EL HTML (Soluciona el error TS2339)
  public openCheckoutModal() {
    this.loadTempReservation(); // Asegurar datos actualizados
    
    if (!this.tempReserva) {
        alert('ERROR: Debes seleccionar tus asientos antes de proceder al pago final. Regresa a la página de reserva.');
        return;
    }
    
    if (this.metodosPago.length === 0) {
        alert('No tienes métodos de pago agregados. Por favor, agrégalo en tu perfil.');
        return;
    }

    this.selectedMetodo = null;
    this.showPaymentModal = true;
  }

  public processPayment() {
    if (!this.selectedMetodo) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    this.loadTempReservation(); // Cargar por última vez

    const tempReserva = this.tempReserva;
    
    if (!tempReserva) {
        alert('Error fatal: Datos de asientos perdidos. Abortando pago.');
        this.showPaymentModal = false;
        return;
    }

    const totalSnacks = this.total; 
    const totalFinal = this.totalReservaAsientos + totalSnacks;

    // 1. Simulación de PAGO
    console.log(`Procesando pago de ${totalFinal} CLP con tarjeta ${this.selectedMetodo.ultima4}`);

    // 2. GUARDAR LA RESERVA FINAL (Asientos + Snacks)
    this.reservationService.saveFinalReservation(tempReserva, totalSnacks, totalSnacks);
    
    // 3. Éxito y Limpieza
    const totalFinalCLP = totalFinal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    const totalSnacksCLP = totalSnacks.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    const totalAsientosCLP = this.totalReservaAsientos.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    
    alert(`✅ ¡Reserva Confirmada! Pago total de ${totalFinalCLP} realizado. (Tickets: ${totalAsientosCLP} + Snacks: ${totalSnacksCLP})`);
    
    this.cartService.clearCart();
    this.close.emit(); // Cierra el sidebar
    this.showPaymentModal = false;
  }

  public removeItem(productId: any) { // 🔑 Hecho público
    this.cartService.removeFromCart(productId);
  }

  public clearCart() { // 🔑 Hecho público
    this.cartService.clearCart();
  }

  public updateQuantity(productId: any, newQuantity: number) { // 🔑 Hecho público
    if (newQuantity <= 0) {
      this.removeItem(productId);
    } else {
      const item = this.items.find(i => i.id === productId);
      if (item) {
        item.quantity = newQuantity;
        this.cartService.updateCart(this.items);
      }
    }
  }

  public checkout() { // 🔑 Hecho público
    this.openCheckoutModal();
  }
}
