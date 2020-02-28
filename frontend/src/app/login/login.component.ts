import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  private subcriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const sub = this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
    });

    this.subcriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subcriptions.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
