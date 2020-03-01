import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit, OnDestroy {

  userform: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  iban: FormControl;

  private subciptions: Subscription = new Subscription();
  private user: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sub = this.route.paramMap.subscribe(params => {
      const userId = params.get("id");
      if (userId) {
        this.userService.userList$.subscribe(users => {
          this.user = users[userId];
        });
      } 
    });
    this.subciptions.add(sub);

    this.createFormControls();
    this.createForm();
  }

  ngOnDestroy() {
    this.subciptions.unsubscribe();
  }

  createFormControls() {
    this.first_name = new FormControl(this.user.first_name, Validators.required);
    this.last_name = new FormControl(this.user.last_name, Validators.required);
    this.iban = new FormControl(this.user.iban, [
      Validators.required
    ]);
  }

  createForm() {
    this.userform = new FormGroup({ 
      id: new FormControl(this.user.id),   
      first_name: this.first_name,
      last_name: this.last_name,
      iban: this.iban
    });
  }

  onSubmit() {
    if (this.userform.valid) {
      const sub = this.userService.modifyUser(new User(this.userform.value)).subscribe(
        () => {

        },
        () => {

        }
      );
      this.subciptions.add(sub);
    }
  }

}
