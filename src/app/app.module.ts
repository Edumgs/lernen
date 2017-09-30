import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { app_routing } from './app.routes';
import { RegistroComponent } from './registro/registro.component';

import { CiudadesService } from './servicio/ciudades.service';
import { LoginGuard } from './guardia/login.guard';
import { NoLoginGuard } from './guardia/no-login.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routing
  ],
  providers: [
    CiudadesService,
    LoginGuard,
    NoLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
