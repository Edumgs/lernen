import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginExito: Boolean;

  constructor(private router: Router) { 
    this.loginExito = false;
  }

  ngOnInit() {
  }

  login (form: NgForm) {
    if (form.value.usuario === 'admin' && form.value.contrasenha === 'monges') {
      localStorage.setItem('usuario', form.value.usuario);
      this.router.navigate(['/home']);
    } else {
      this.loginExito = true;
    }
  }

}
