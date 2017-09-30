import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';

const app_routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
]

export const app_routing = RouterModule.forRoot(app_routes);