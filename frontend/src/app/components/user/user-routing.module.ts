import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EditUserComponent } from './edit-user/edit-user.component';

const userRoutes: Routes = [
    {
        path: 'users', component: UserListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'users/edit/:id', component: EditUserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'users/add', component: EditUserComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ]
})
export class UserRoutingModule { }
