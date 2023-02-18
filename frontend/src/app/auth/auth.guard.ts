import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate() {
    return this.http.get('/api/auth/who-am-i').pipe(
      map(() => true),
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.Unauthorized
        ) {
          return of(this.router.parseUrl('/auth/sign-in'));
        }
        throw error;
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) {}
}
