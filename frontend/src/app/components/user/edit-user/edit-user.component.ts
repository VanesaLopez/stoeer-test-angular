import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Alert } from 'src/app/models/alert.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, OnDestroy {

  userform: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  iban: FormControl;
  buttonSubmit = 'Add User';
  alert: Alert = new Alert();
  loading: boolean;

  private subciptions: Subscription = new Subscription();
  private user: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const sub = this.route.paramMap.subscribe(params => {
      const userId = parseInt(params.get("id"));
      if (userId) {
        // TODO: Decide where to get the user (api or service)
        this.getUserFromService(userId);  
        // this.getUser(userId);
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
      Validators.required,
      Validators.pattern('ES[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?')
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
      if (this.userform.value.id) {
        this.modifyUser();
      } else {
        this.addUser();
      }
    }
  }

  private modifyUser(): void {
    const sub = this.userService.modifyUser(new User(this.userform.value)).subscribe(
      () => {
        this.alert.setInfo();
      },
      () => {
        this.alert.setError();
      }
    );
    this.subciptions.add(sub);
  }

  private addUser(): void {
    const sub = this.userService.addUser(new User(this.userform.value)).subscribe(
      () => {
        this.alert.setInfo();
      },
      () => {
        this.alert.setError();
      }
    );
    this.subciptions.add(sub);
  }

  private getUser(id: number): void {
    this.loading = true;
    const sub = this.userService.getUser(id).subscribe(
      (user) => {
        this.user = new User(user);
        this.loading = false;
      },
      () => {
        this.alert.setError();
        this.loading = false;
      }
    );
    this.subciptions.add(sub);
  }

  private getUserFromService(id: number): void {
    const sub = this.userService.userList$.subscribe(users => {
      if (users[id]) {
        this.user = users[id];
        this.buttonSubmit = 'Update User';
      } else {
        this.router.navigate(['/users']);
      }
    });
    this.subciptions.add(sub);
  }

}
