import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Task } from '../shared/task';
import * as firebase from 'firebase/app';

@Injectable()
export class TodoService {
  constructor(private firebasedb: AngularFireDatabase) { }

  toDoList: AngularFireList<any>;

  /*
   * Retrieve the logged in user's to do list from Firebase database
   */
  getToDoList() {
    try {
    return this.toDoList = this.firebasedb.list(`tasks/${firebase.auth().currentUser.uid}`);
    } catch (e) {}
  }

  /*
   * Add task to do list when it is less than 30 characters long
   */
  addTask(task: any): void {
    task.name.length <= 30 ? this.toDoList.push(task) : alert('Task name must be 30 characters or less');
  }

  /*
   * Update completion status of a task based on its ID
   */
  updateTask(task: Task): void {
    this.toDoList.update(task.id, {complete: !task.complete}).catch(e => alert(e.message));
  }

  /*
   * Remove a task from a user's to do list
   */
  deleteTask(task: Task): void {
    this.toDoList.remove(task.id).catch(e => alert(e.message));
  }
}
