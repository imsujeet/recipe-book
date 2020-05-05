import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFWfnlYnLo7-8SyLQ8Ypv8gD0uxdOCcY4';

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe (
      catchError(errorRes => {
        let errormessage = 'An unknown error Occured!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errormessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errormessage = 'The email address is already in use by another account.';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errormessage = 'Password sign-in is disabled';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errormessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
        }
        return throwError(errormessage);
      })
    );
  }
}
