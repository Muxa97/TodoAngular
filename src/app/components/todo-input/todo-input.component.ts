import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class TodoInputComponent implements OnInit {

  public todoText: string;

  constructor(private todoService: TodoService) {
    this.todoText = '';
  }

  ngOnInit() {
  }

  public addTodo(): void {
    this.todoService.addTodo(this.todoText);
    this.todoText = '';
  }
}
