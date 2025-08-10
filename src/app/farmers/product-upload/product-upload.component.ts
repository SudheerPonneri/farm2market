import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-upload',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.scss'
})
export class ProductUploadComponent {
  f;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.f = this.fb.group({
      cropName: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [1, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  submit() {
    if (this.f.invalid) return;
    const farmer = this.auth.currentUser;
    if (!farmer) return;
    const product: Product = {
      id: Math.random().toString(36).substring(2, 10),
      farmerId: farmer.id,
      name: this.f.value.cropName ?? '',
      description: this.f.value.description ?? '',
      price: this.f.value.price ?? 0,
      quantity: this.f.value.quantity ?? 0
    };
    // Save to localStorage (or a service)
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    this.f.reset();
    alert('Product uploaded!');
  }

  goToDashboard() {
    this.router.navigate(['/farmer/dashboard']);
  }
}
