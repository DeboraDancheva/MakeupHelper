import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { environment } from '../models/BaseUrl';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  API_URL = this.baseUrl + '/api/auth/';

  constructor(private http: HttpClient,  private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {debugger;
    return this.http.post<any>(this.API_URL+"signin", { username, password })
      .pipe(map(user => {debugger;
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(localStorage.getItem('currentUser'));
        }

        return user;
      }));
  }

  register(user: User) {debugger;
    return this.http.post(this.API_URL + "signup", {firstname: user.firstname, lastname: user.lastname, username: user.username,
      email: user.email,
      password: user.password})
  }

  isCurrentUserAdmin() {debugger;
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let role = user['roles'][0];
    return role === 'ADMIN';
  }

  logout() {debugger;
          localStorage.removeItem('isUserFaceConfigSet');
          localStorage.removeItem('currentUser');
          this.currentUserSubject.closed;
        this.router.navigate(['']);
    
  }
}
