import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Alert } from 'src/app/models/alert.model';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
    `button:disabled {
        cursor: not-allowed;
    }`
  ]
})
export class EditUserComponent implements OnInit, OnDestroy {

  userform: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  iban: FormControl;
  buttonSubmit = 'Add User';
  alert: Alert = new Alert();
  notUpdate: boolean = false;
  private creator: string;

  private subciptions: Subscription = new Subscription();
  private user: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    
    const sub = this.authService.authState.subscribe((user) => {
      this.creator = user.authToken;
    });
    this.subciptions.add(sub);
  }

  ngOnInit() {
    const sub = this.route.paramMap.subscribe(params => {
      const userId = parseInt(params.get("id"));
      if (userId) {
        // TODO: Decide where to get the user (api or service)
        this.getUserFromService(userId);  
        // this.getUser(userId);
      } else {
        this.createFormControls();
        this.createForm();
      }
    });
    this.subciptions.add(sub);    
  }

  ngOnDestroy() {
    this.subciptions.unsubscribe();
  }

  createFormControls() {
    this.first_name = new FormControl({
      value: this.user.first_name,
      disabled: this.notUpdate
      }, 
      Validators.required);
    this.last_name = new FormControl({
      value: this.user.last_name,
      disabled: this.notUpdate
      }, 
      Validators.required);
    this.iban = new FormControl({
      value: this.user.iban,
      disabled: this.notUpdate
      }, [
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
      (error) => {
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
      (error) => {
        this.alert.setError();
      }
    );
    this.subciptions.add(sub);
  }

  private getUser(id: number): void {
    const sub = this.userService.getUser(id).subscribe(
      (user) => {
        this.user = new User(user);
        this.buttonSubmit = 'Update User';
        this.canUpdate();
        this.createFormControls();
        this.createForm();
      },
      (error) => {
        this.alert.setError();
      }
    );
    this.subciptions.add(sub);
  }

  private getUserFromService(id: number): void {
    const sub = this.userService.userList$.subscribe(users => {
      if (users[id]) {
        this.user = users[id];
        this.buttonSubmit = 'Update User';
        this.canUpdate();
        this.createFormControls();
        this.createForm();
      } else {
        this.router.navigate(['/users']);
      }
    });
    this.subciptions.add(sub);
  }

  private canUpdate(): void {
    if (this.user.creator === this.creator) {
      this.notUpdate = false;
    } else {
      this.notUpdate = true;
      this.alert.setWarning();
    }
  }

}
