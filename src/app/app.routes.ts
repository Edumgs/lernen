import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

import { LoginGuard } from './guardia/login.guard';
import { NoLoginGuard } from './guardia/no-login.guard';

const app_routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
]

export const app_routing = RouterModule.forRoot(app_routes);