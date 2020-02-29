import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private ulr = `${environment.apiURL}/api/users`;

  constructor(private httpClient: HttpClient) { }
}
