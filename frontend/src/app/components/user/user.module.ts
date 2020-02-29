import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,    
    HttpClientModule,
    UserRoutingModule
  ],
  declarations: [ UserListComponent ],
  providers: [ UserService ],
  exports: [ UserListComponent ]
})
export class UserModule { }
