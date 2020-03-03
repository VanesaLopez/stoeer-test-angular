import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Subscription } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoginComponent } from '../login/login.component';
import { By } from '@angular/platform-browser';
import { provideConfig } from 'src/app/config/social-login';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ 
        HeaderComponent,
        LoginComponent
      ],
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
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('unsubscribe', () => {
    const unsubscribeSpy = spyOn(Subscription.prototype, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should be viseble nav', () => {
    component.loggedIn = true;
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('app-nav'));

    expect(nav).toBeTruthy();
  });

  it('should not be viseble nav', () => {
    component.loggedIn = false;
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('app-nav'));

    expect(nav).toBeFalsy();
  });

  it('should be viseble login/logout', () => {
    const login = fixture.debugElement.query(By.css('app-login'));

    expect(login).toBeTruthy();
  });
});
