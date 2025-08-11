import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class FarmerLoginComponent {
  f;
  constructor(private fb: FormBuilder, private router: Router) {
    this.f = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.f.invalid) return;
    // TODO: Add authentication logic here
    this.router.navigate(['/farmer/dashboard']);
  }
}
