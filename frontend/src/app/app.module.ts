import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideConfig } from './config/social-login';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { UserModule } from './components/user/user.module';
import { AuthGuardService } from './services/auth-guard.service';
import { CoreModule } from './components/core/core.module';
import { ModalComponent } from './components/share/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SocialLoginModule,
    UserModule,
    CoreModule,
    NgbModalModule
  ],
  entryComponents:[
    ModalComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
