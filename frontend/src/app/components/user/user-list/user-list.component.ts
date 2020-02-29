import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserList();
  }

  trackByFn(index: number, user: User): number {
    return user.id;
  }

}
