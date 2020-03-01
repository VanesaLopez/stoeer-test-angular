import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'angularx-social-login';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ModalComponent } from '../../share/modal/modal.component';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
    `button:disabled {
        cursor: not-allowed;
    }`
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  public creator: string;
  public alert: Alert = new Alert();
  private subciptions: Subscription = new Subscription();

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { 
    const sub = this.authService.authState.subscribe((user) => {
      this.creator = user.authToken;
    });
  }

  ngOnInit(): void {    
    this.userService.getUserList();
  }

  ngOnDestroy(): void {
    this.subciptions.unsubscribe();
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

  openDeleteModal(id: number) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Delete User';
    modalRef.componentInstance.content = 'Are you sure that really want delete this uer?';
    modalRef.componentInstance.data = id;
    const sub = modalRef.componentInstance.accept.subscribe(($e) => {
      this.delete($e);
    });
    this.subciptions.add(sub);
  }

  private delete(id: number) {
    const sub = this.userService.deleteUser(id).subscribe(
      () => {

        this.alert.setInfoDelete();
        this.userService.getUserList();
      },
      (error) => {
        this.alert.setError();
      }
    );
    this.subciptions.add(sub);
  }

}
