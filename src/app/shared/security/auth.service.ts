import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;

  constructor(public auth$: FirebaseAuth, private router: Router) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({provider, method: AuthMethods.Popup})
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signUp(email, password): firebase.Promise<FirebaseAuthState> {
      return this.auth$.createUser({email, password})
        .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  login(email, password): firebase.Promise<FirebaseAuthState> {
      return this.auth$.login({email, password})
        .catch(error => console.log('ERROR @ AuthService#login() :', error));
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  logout() {
        this.auth$.logout();
        localStorage.removeItem('profile');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        this.router.navigate(['/']);
    }
}
