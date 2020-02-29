import { Component, Input } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
  @Input() loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }
}
