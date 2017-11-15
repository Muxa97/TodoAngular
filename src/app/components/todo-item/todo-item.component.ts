import { Component, Input } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input()
  public todo: TodoModel;
  public todoTextStyle = 'notDone';

  constructor(private todoService: TodoService) { }

  public removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  public editTodo(): void {
    this.todo.edit = !this.todo.edit;
  }

  public changeTodo(newText: string): void {
    this.todo.edit = false;
    if (newText) {
      this.todoService.changeTodo(this.todo.id, newText);
      this.todoTextStyle = 'notDone';
    }

  }

  public doToDo(): void {
    this.todoService.changeDone(this.todo.id, !this.todo.done);
    if (this.todo.done) {
      this.todoTextStyle = 'done';
    } else {
      this.todoTextStyle = 'notDone';
    }
  }
}
