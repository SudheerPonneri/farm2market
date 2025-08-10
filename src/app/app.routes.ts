import { Routes } from '@angular/router';

// Farmer Components
import { LoginComponent } from './farmers/login/login.component';
import { DashboardComponent } from './farmers/dashboard/dashboard.component';
import { ProductUploadComponent } from './farmers/product-upload/product-upload.component';

// Consumer Components
import { LoginComponent as ConsumerLoginComponent } from './consumers/login/login.component';
import { DashboardComponent as ConsumerDashboardComponent } from './consumers/dashboard/dashboard.component';
import { ProductListComponent } from './consumers/product-list/product-list.component';
import { CartComponent } from './consumers/cart/cart.component';

// Guard
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'consumer/login', pathMatch: 'full' },

  // Farmer routes
  { path: 'farmer/login', component: LoginComponent },
  { path: 'farmer/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'farmer/upload', component: ProductUploadComponent, canActivate: [AuthGuard] },

  // Consumer routes
  { path: 'consumer/login', component: ConsumerLoginComponent },
  { path: 'consumer/dashboard', component: ConsumerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'consumer/products', component: ProductListComponent },
  { path: 'consumer/cart', component: CartComponent, canActivate: [AuthGuard] },

  // Wildcard route
  { path: '**', redirectTo: '' }
];
