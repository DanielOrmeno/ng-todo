import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  /*
   * Get the current user currently authenticated by firebase
   */
  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  /*
   * Create a new user with their credentials in firebase
   */
  createUser(value: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  /*
   * Authenticate a user's login details
   */
  login(value: User) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  /*
   * Log out the current user
   */
  logout() {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser ? resolve(this.afAuth.auth.signOut()) : reject();
      /* if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      } */
    });
  }
}
