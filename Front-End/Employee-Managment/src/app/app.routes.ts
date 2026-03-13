import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component/register.component';
import { LoginComponent } from './login.component/login.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';

export const routes: Routes = [

 { path: '', component: RegisterComponent },
 { path: 'login', component: LoginComponent },   
 { path: 'dashboard', component: DashboardComponent }

];