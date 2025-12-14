import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';
import { Snack, SnackService } from '../../services/snack/snack.service'; // Importar SnackService e interfaz

@Component({
  selector: 'app-catalogo-snacks',
  templateUrl: './catalogo-snacks.component.html',
  styleUrls: ['./catalogo-snacks.component.css']
})
export class CatalogoSnacksComponent implements OnInit, AfterViewInit {
  
  snacks: Snack[] = [];
  showCart = false;

  constructor(
    private cart: CartService, 
    private snackService: SnackService
  ) {}

  @ViewChildren('snackImg') snackImgs!: QueryList<ElementRef<HTMLImageElement>>;

  ngOnInit(): void {
    this.loadSnacks();
  }
  
  loadSnacks(): void {
    this.snacks = this.snackService.getSnacksList();
  }

  ngAfterViewInit(): void {
    // Lógica para aplicar color del título desde la imagen (se mantiene igual)
    setTimeout(() => {
      let target: HTMLImageElement | null = null;
      this.snackImgs.forEach(el => {
        const img = el.nativeElement as HTMLImageElement;
        const alt = (img.alt || '').toLowerCase();
        if (!target && (alt.includes('popcorn') || alt.includes('pop corn') || alt.includes('popcorn'))) {
          target = img;
        }
      });
      if (!target) {
        target = this.snackImgs && this.snackImgs.first ? this.snackImgs.first.nativeElement : null;
      }

      if (target) {
        if (target.complete && target.naturalWidth !== 0) {
          this.applyTitleColorFromImage(target);
        } else {
          target.addEventListener('load', () => this.applyTitleColorFromImage(target as HTMLImageElement));
        }
      }
    }, 0);
  }

  private applyTitleColorFromImage(img: HTMLImageElement) {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = 20; const h = 20;
      canvas.width = w; canvas.height = h;
      try { (img as any).crossOrigin = 'anonymous'; } catch {}
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; g += data[i+1]; b += data[i+2];
        count++;
      }
      r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
      const rgb = `rgb(${r}, ${g}, ${b})`;
      document.documentElement.style.setProperty('--catalog-title-bg', rgb);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
      const fg = luminance > 186 ? '#111827' : '#ffffff';
      document.documentElement.style.setProperty('--catalog-title-foreground', fg);
    } catch (e) {
      // ignore errors
    }
  }

  // 🔑 CORRECCIÓN CLAVE: Mapear propiedades a lo que el Carrito espera (name, image)
  addToCart(snack: Snack) {
    const itemToAdd = {
        id: snack.id,
        name: snack.nombre,      // 🔑 Mapeo de nombre a name
        price: snack.precio,
        image: snack.imageUrl,   // 🔑 Mapeo de imageUrl a image
        quantity: 1,
    };
    this.cart.addToCart(itemToAdd);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
