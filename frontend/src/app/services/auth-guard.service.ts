import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    this.authService.authState.subscribe((user) => {
      return (user != null);
    });

    return false;
  }
}
