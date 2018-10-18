import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers : [TodoService]
})
export class ToDoListComponent implements OnInit {
  constructor(private toDoService: TodoService) {}

  private toDoList: Task[] = [];
  private inputVisible: Boolean = true;

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(tasks => {
      this.toDoList = [];
      tasks.forEach(rawTask => {
          const jsonTask: any = rawTask.payload.toJSON();
          if (jsonTask) {
            this.toDoList.push(new Task(jsonTask.name, jsonTask.complete, rawTask.key));
          }
      });
    });
  }

  addTask(input: HTMLInputElement): void {
    if (input.value) {
      this.toDoService.addTask({name: input.value, complete: false});
      input.value = '';
    }
  }

  updateTask(task: Task): void {
    this.toDoService.updateTask(task);
  }

  deleteTask(task: Task): void {
    this.toDoService.deleteTask(task);
  }

}
