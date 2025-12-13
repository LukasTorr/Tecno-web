import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';

@Component({
  selector: 'app-catalogo-snacks',
  templateUrl: './catalogo-snacks.component.html',
  styleUrls: ['./catalogo-snacks.component.css']
})
export class CatalogoSnacksComponent {
  snacks = [
    { id: 1, name: 'Ramitas Evercrisp', price: 2690, image: 'assets/image/snacks/ramitas.jpg' },
    { id: 2, name: 'Cheezels 200g', price: 1750, image: 'assets/image/snacks/cheezels.jpg' },
    { id: 3, name: 'Papa Kryzpo 37g', price: 3000, image: 'assets/image/snacks/PapaKryzpo.jpg' },
    { id: 4, name: 'Tubos Acido Fini', price: 3000, image: 'assets/image/snacks/TubosAcidoFini.jpg' },
    { id: 5, name: 'M&M 48g', price: 3000, image: 'assets/image/snacks/M&M.jpg' },
    { id: 6, name: 'PopCorn Pequeño', price: 7000, image: 'assets/image/snacks/smallpopcorn.jpg' },
    { id: 7, name: 'PopCorn Mediano', price: 10000, image: 'assets/image/snacks/mediumpopcorn.png' },
    { id: 8, name: 'PopCorn Grande', price: 15000, image: 'assets/image/snacks/largepopcorn.jpg' },
    { id: 9, name: 'Bebida Pequeña 400ml', price: 4800, image: 'assets/image/snacks/smalldrink.jpg' },
    { id: 10, name: 'Bebida Mediana 600ml', price: 5900, image: 'assets/image/snacks/mediumdrink.jpg' },
    { id: 11, name: 'Bebida Grande 900ml', price: 6100, image: 'assets/image/snacks/largedrink.jpg' },
    { id: 12, name: 'Agua 500ml ', price: 2000, image: 'assets/image/snacks/awua500.jpg' },
  ];

  showCart = false;

  constructor(private cart: CartService) {}

  @ViewChildren('snackImg') snackImgs!: QueryList<ElementRef<HTMLImageElement>>;

  ngAfterViewInit(): void {
    // Wait a tick for images to be available
    setTimeout(() => {
      // Prefer an image that looks like popcorn (snack name contains 'popcorn' or 'PopCorn')
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
          // target is not null here due to the outer check; assert non-null to satisfy TS
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

      const w = 20; const h = 20; // small sample
      canvas.width = w; canvas.height = h;
      // draw the image scaled to small canvas
      // try to avoid tainting by setting crossOrigin if possible
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
      // compute readable foreground color (black or white) based on luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
      const fg = luminance > 186 ? '#111827' : '#ffffff';
      document.documentElement.style.setProperty('--catalog-title-foreground', fg);
    } catch (e) {
      // ignore errors
    }
  }

  addToCart(snack: any) {
    this.cart.addToCart(snack);

  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
