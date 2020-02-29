import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const userRoutes: Routes = [
    {
        path: 'users', component: UserListComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ]
})
export class UserRoutingModule { }
