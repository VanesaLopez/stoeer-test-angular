import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
    `button:disabled {
        cursor: not-allowed;
    }`
  ]
})
export class UserListComponent implements OnInit {

  public creator: string;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
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

  edit(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

  delete(id: number) {

  }

}
