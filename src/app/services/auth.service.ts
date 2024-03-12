import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: Subject<any> = new Subject();
  user: any;
  constructor(private router: Router) {
    initializeApp(environment.firebase);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
      this.user = user;
    });
  }

  login(username: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username + '@login.tld', password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigateByUrl('/home');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/invalid-credential') {
          alert('Invalid Username or Password');
        } else {
          alert('Login failed');
        }
      });
  }

  logout() {
    const auth = getAuth();
    auth.signOut();
    this.router.navigateByUrl('/home');
  }

  setUser() {
    let session = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.userSubject.next(session);
    this.user = session;
  }
}
