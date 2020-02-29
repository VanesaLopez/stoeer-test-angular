import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  public creator: string;

  constructor(
    public userService: UserService,
    private authService: AuthService
  ) { 
    const sub = this.authService.authState.subscribe((user) => {
      this.creator = user.authToken;
    });
  }

  ngOnInit(): void {    
    this.userService.getUserList();
  }

  trackByFn(index: number, user: User): number {
    return user.id;
  }

}
