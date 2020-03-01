import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorAlertComponent } from '../error/error-alert/error-alert.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,    
    HttpClientModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    UserListComponent,
    ErrorAlertComponent,
    EditUserComponent
  ],
  providers: [ UserService ],
  exports: [ UserListComponent ]
})
export class UserModule { }
