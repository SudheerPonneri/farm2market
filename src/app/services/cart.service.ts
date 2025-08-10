import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'fr_cart';

  getCart(): { product: Product; qty: number }[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  add(product: Product, qty = 1) {
    const cart = this.getCart();
    const found = cart.find((c: any) => c.product.id === product.id);
    if (found) found.qty += qty;
    else cart.push({ product, qty });
    localStorage.setItem(this.key, JSON.stringify(cart));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}