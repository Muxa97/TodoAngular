import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class TodoInputComponent {

  public todoText: string;
  public todosLenght = this.todoService.todos.length;

  constructor(private todoService: TodoService) {
    this.todoText = '';
  }

  public addTodo(): void {
    this.todoService.addTodo(this.todoText);
    this.todoText = '';
  }

  public removeAll(): void {
    this.todoService.removeAll();
  }
}
