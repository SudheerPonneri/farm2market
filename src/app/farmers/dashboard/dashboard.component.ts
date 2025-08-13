import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  farmer: User | null;

  constructor(private auth: AuthService) {
    this.farmer = this.auth.currentUser;
  }
farmerCrops = [
  // Example:
  {
    cropName: 'Wheat',
    quantity: 100,
    price: 25,
    date: new Date(),
    description: 'High quality wheat',
    imageUrl: '', // optional
  }
];
  cropTypeClass(name: string) {
  const n = name?.toLowerCase() || '';
  if (n.includes('wheat')) return 'wheat';
  if (n.includes('rice')) return 'rice';
  if (n.includes('corn')) return 'corn';
  if (n.includes('soy')) return 'soybean';
  if (n.includes('sugar')) return 'sugarcane';
  if (n.includes('tomato')) return 'tomato';
  if (n.includes('potato')) return 'potato';
  return 'default';
}
}
