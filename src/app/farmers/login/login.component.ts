import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-farmer-login', 
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  f;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.f = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      village: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.f.invalid) return;
    // Save all farmer details in user object
    const { username, phone, village, password } = this.f.value;
    this.auth.login(
      username ?? '',
      'farmer',
      { phone: phone ?? '', village: village ?? '', password: password ?? '' }
    );
    this.router.navigate(['/farmer/dashboard']);
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoginComponent],
  exports: [LoginComponent]
})
export class FarmersModule { }