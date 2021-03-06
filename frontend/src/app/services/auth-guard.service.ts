import {CanActivate, Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, tap, catchError} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(
      map(user => user !== null),
      catchError(err => of(false)),
      tap((isLoggedIn) => {
        if(!isLoggedIn) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
