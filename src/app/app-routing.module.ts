import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para a tela de login se a rota for vazia
  { path: 'login', component: LoginComponent }, // Adicione a rota para a tela de login
  { path: 'dashboard', component: DashboardViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
