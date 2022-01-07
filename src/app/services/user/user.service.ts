import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = new BehaviorSubject<any>([]);

  private data_users = [
    {
      fullname: 'John Doe',
      birthdate: new Date(),
      identification: 13233445566,
    },
    {
      fullname: 'John Doe',
      birthdate: new Date(),
      identification: 13233445566,
    },
    {
      fullname: 'John Doe',
      birthdate: new Date(),
      identification: 13233445566,
    }
  ]
  constructor(private http: HttpClient) {
    this._users.next(this.data_users);
  }

  get users() {
    return this._users.asObservable();
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  createUser(userData: {fullname: string, birthdate: Date, identification: number}) {
    const payload = {
      ...userData,
      father_id: null,
      mother_id: null,
    };
    return this.http.post('https://jsonplaceholder.typicode.com/users', payload);
  }
}
