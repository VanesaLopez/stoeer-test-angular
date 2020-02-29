import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken: string;

        this.authService.authState.subscribe((user) => {
            if (user != null) {
                authToken = user.authToken;   
            }
        }); 
        
        const authReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': `Token ${authToken}`
            })
        });

        return next.handle(authReq);
    }
}
