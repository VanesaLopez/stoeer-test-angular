import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Subscription } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoginComponent } from '../login/login.component';

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
});
