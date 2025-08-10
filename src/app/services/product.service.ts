import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private key = 'fr_products';

  getAll(): Product[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) as Product[] : [];
  }

  save(product: Product) {
    const list = this.getAll();
    product.id = product.id || this.makeId();
    list.push(product);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  getByFarmer(farmerId: string) {
    return this.getAll().filter(p => p.farmerId === farmerId);
  }

  find(id: string) {
    return this.getAll().find(p => p.id === id) || null;
  }

  update(updated: Product) {
    const list = this.getAll().map(p => p.id === updated.id ? updated : p);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  remove(id: string) {
    const list = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  private makeId(len = 10) {
    return Math.random().toString(36).substring(2, 2 + len);
  }
}