import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subscription, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { By } from '@angular/platform-browser';

const user = new User({
  id: 1, 
  first_name: 'Jonh', 
  last_name: 'Lennon', 
  iba: 'ES9420805801101234567891',
  own: true
});

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        EditUserComponent
      ],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({id: 1})) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call to get user', () => {
    const getUserSpy = spyOn(<any>component, 'getUser');

    component.ngOnInit();

    expect(getUserSpy).toHaveBeenCalled();
  });

  it('should be unsubscribe', () => {
    const unSubSpy = spyOn(Subscription.prototype, 'unsubscribe');

    component.ngOnDestroy();

    expect(unSubSpy).toHaveBeenCalledTimes(1);
  });

  it('should be generate form when get user', () =>{    
    const canUpdateSpy = spyOn(<any>component, 'canUpdate');
    const createFormControlsSpy = spyOn(<any>component, 'createFormControls');
    const createFormSpy = spyOn(<any>component, 'createForm');
    const subSpy = spyOn(Subscription.prototype, 'add');
    const userService = TestBed.get(UserService);
    spyOn(userService, 'getUser').and.returnValue(of(user));

    (<any>component).getUser(1);

    expect(canUpdateSpy).toHaveBeenCalled();
    expect(createFormControlsSpy).toHaveBeenCalled();
    expect(createFormSpy).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
  });

  it('error when get user', () =>{  
    const subSpy = spyOn(Subscription.prototype, 'add');
    const userService = TestBed.get(UserService);
    spyOn(userService, 'getUser').and.returnValue(throwError({status: 404}));    
    const alert = spyOn(component.alert, 'setError');

    (<any>component).getUser(1);

    expect(alert).toHaveBeenCalled();
    expect(subSpy).toHaveBeenCalled();
  });

  it('should can update the user', () =>{
    (<any>component).user = user;

    (<any>component).canUpdate();

    expect(component.notUpdate).toBe(false);
  });

  it('should can not update the user', () =>{
    (<any>component).user = user;
    user.own = false;
    const alert = spyOn(component.alert, 'setWarning');

    (<any>component).canUpdate();

    expect(component.notUpdate).toBe(true);
    expect(alert).toHaveBeenCalled();
  });
});
