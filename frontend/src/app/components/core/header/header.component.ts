import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  private subcriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
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
}
