import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = ! this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resdata => {
      console.log(resdata);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errormessage => {
      console.log( errormessage);
      this.error = errormessage;
      this.isLoading = false;
    });

    form.reset();
  }




}
