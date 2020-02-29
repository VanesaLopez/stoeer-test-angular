import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

const config = new AuthServiceConfig([
  {
    id: null,
    provider: new GoogleLoginProvider("xxx")
  }
]);

export function provideConfig() {
  return config;
}

describe('HeaderComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        AuthService,
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('subscription', () => {
    const addSpy = spyOn(Subscription.prototype, 'add');

    component.ngOnInit();

    expect(addSpy).toHaveBeenCalled();
  });

  it('should be login', () => {
    component.loggedIn = true;
    fixture.detectChanges();
    const out = fixture.debugElement.query(By.css('.btn-out'));

    expect(out).toBeTruthy();
  });

  it('should be logout', () => {
    fixture.detectChanges();
    const up = fixture.debugElement.query(By.css('.btn-up'));

    expect(up).toBeTruthy();
  });

  it('sign with Google', () => {
    const authService = TestBed.get(AuthService);
    const signInSpy = spyOn(authService, 'signIn');

    component.signInWithGoogle();

    expect(signInSpy).toHaveBeenCalled();
  });

  it('signOut', () => {
    const authService = TestBed.get(AuthService);
    const signOutSpy = spyOn(authService, 'signOut');

    component.signOut();

    expect(signOutSpy).toHaveBeenCalled();
  });

  it('unsubscribe', () => {
    const unsubscribeSpy = spyOn(Subscription.prototype, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
