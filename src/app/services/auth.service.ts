import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  session: any;
  constructor(private router: Router) {}

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
    }
    console.log(user);

    return user;
  }

  logout() {
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigateByUrl('/');
  }
}
