import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit{

  @Input()
  public todo: TodoModel;
  public todoTextStyle = 'notDone';
  public todoText = '';

  ngOnInit() {
    if (this.todo.done) {
      this.todoService.todosDone++;
      this.todoTextStyle = 'done';
    } else {
      this.todoTextStyle = 'notDone';
    }
  }

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
      this.todoText = '';
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

  public moveup(): void {
    this.todoService.changeOrder(this.todo, 1);
  }

  public movedown(): void {
    this.todoService.changeOrder(this.todo, -1);
  }
}
