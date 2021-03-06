import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideConfig } from 'src/app/config/social-login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
});
