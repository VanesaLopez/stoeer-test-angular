import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  public error: boolean;
  public userList$: Observable<Array<User>> = new Observable<Array<User>>();
  private url = `${environment.apiURL}/api/users`;  

  constructor(private httpClient: HttpClient) { }

  getUserList(): void {
    this.error = false;
    this.userList$ = this.httpClient.get<Array<User>>(this.url).pipe(
      map(users => users.map(user => new User(user))),
      catchError(err => {
        this.error = true;
        return new Observable<Array<User>>();
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/id`);
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post(this.url, user);
  }

  modifyUser(user: User): Observable<any> {
    return this.httpClient.patch(`${this.url}/${user.id}`, user);
  }
  
}
