import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  get users() {
    return this._users.asObservable();
  }

  getUsers() {
    // https://jsonplaceholder.typicode.com/
    return this.http.get(`${environment.apiUrl}users`)
      .pipe(tap(
        (users) => {
          this._users.next(users);
        }
      ));
  }

  createUser(userData: {fullname: string, birthdate: string, identification: number}) {
    const payload = {
      ...userData,
      birthdate: new Date(userData.birthdate),
      father_id: null,
      mother_id: null,
    };
    return this.http.post(`${environment.apiUrl}users`, payload);
  }
}
