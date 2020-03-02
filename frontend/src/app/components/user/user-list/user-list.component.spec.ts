import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';

const config = new AuthServiceConfig([
  {
    id: null,
    provider: new GoogleLoginProvider("xxx")
  }
]);

export function provideConfig() {
  return config;
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ UserListComponent ],
      providers: [
        UserService,
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
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be error component', () => {
    const userService = TestBed.get(UserService);
    userService.error = true;
    fixture.detectChanges();

    const errorAlert = fixture.debugElement.query(By.css('app-alert'));

    expect(errorAlert).toBeTruthy();
  });

  it('should not be error component', () => {
    const errorAlert = fixture.debugElement.query(By.css('app-alert'));

    expect(errorAlert).toBeFalsy();
  });
});
