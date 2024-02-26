import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any[] = [
    {
      uid: 1,
      name: 'Lukas',
      username: 'lukas',
      password: '123',
    },
    {
      uid: 2,
      name: 'Jonas',
      username: 'jonas',
      password: '321',
    },
  ];
  sessionSubject: Subject<any> = new Subject();
  session: any;
  constructor(private router: Router) {}

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
      this.sessionSubject.next(user);
    }

    return user;
  }

  logout() {
    this.sessionSubject.next(null);
    localStorage.removeItem('session');
    this.router.navigateByUrl('/home');
  }

  setSession() {
    let session = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.sessionSubject.next(session);
    this.session = session;
  }
}


