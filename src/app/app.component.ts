import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  usuario: String;

  constructor(private router:Router) {}

  logout () {
    console.log(localStorage.getItem('usuario'));
    localStorage.removeItem('usuario');
    console.log(localStorage.getItem('usuario'));
    this.router.navigate(['/login']);
  }

  mostrarLogin ():Boolean {
    if (localStorage.length == 0) {
      return false;
    } else {
      this.usuario = localStorage.getItem('usuario');
      return true;
    }
  }
}
