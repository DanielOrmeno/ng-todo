import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Task } from '../shared/task';

@Injectable()
export class TodoService {
  constructor(private firebasedb: AngularFireDatabase) { }

  toDoList: AngularFireList<any>;

  /*
   *
   */
  getToDoList() {
    return this.toDoList = this.firebasedb.list('tasks/rb');
  }

  /*
   *
   */
  addTask(task: object): void {
    this.toDoList.push(task);
  }

  /*
   *
   */
  updateTask(task: Task): void {
    this.toDoList.update(task.id, {complete: !task.complete});
  }

  /*
   *
   */
  deleteTask(task: Task): void {
    this.toDoList.remove(task.id);
  }
}
