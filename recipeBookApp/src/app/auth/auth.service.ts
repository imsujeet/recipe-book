import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.modal';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) { }
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFWfnlYnLo7-8SyLQ8Ypv8gD0uxdOCcY4';
  urlSignin = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFWfnlYnLo7-8SyLQ8Ypv8gD0uxdOCcY4';

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.url, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe (
      catchError(this.handleErr),
      tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );

      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.urlSignin, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe (
      catchError(this.handleErr),
      tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );

      })

    );

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);

  }

  private handleErr(errorRes: HttpErrorResponse) {
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
      case 'EMAIL_NOT_FOUND':
        errormessage = 'This Email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errormessage = 'Incorrect password!!';
        break;
    }
    return throwError(errormessage);


  }
}
