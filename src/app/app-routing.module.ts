import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: '**', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
