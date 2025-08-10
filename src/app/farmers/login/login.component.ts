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
    this.f = this.fb.group({ username: ['', Validators.required] });
  }
  submit() {
    if (this.f.invalid) return;
    this.auth.login(this.f.value.username!, 'farmer');
    this.router.navigate(['/farmer']);
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoginComponent],
  exports: [LoginComponent]
})
export class FarmersModule { }