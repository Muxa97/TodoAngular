import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoService {

  public todos: TodoModel[];
  public nextId: number;
  public totalPages: number;

  constructor() {
    const nextId = localStorage.getItem('nextId');
    const todosStr = localStorage.getItem('todos');

    this.nextId = parseInt(nextId, 10);
    this.todos = JSON.parse(todosStr);
    if (!this.todos) {
      this.todos = [];
    }

    this.totalPages = Math.floor(this.todos.length / 5) + 1;
  }

  public saveTodos(): void {
    localStorage.setItem('nextId', this.nextId.toString(10));
    const todosStr = JSON.stringify(this.todos);
    localStorage.setItem('todos', todosStr);
  }

  public addTodo(text: string): void {
    if (text === '') {
      text = 'Do nothing';
    }
    const todo = new TodoModel(this.nextId, text);
    todo.todoTextStyle = 'notDone';
    this.todos.push(todo);
    this.nextId++;
    this.saveTodos();
    this.totalPages = Math.floor(this.todos.length / 5) + 1;
  }

  public getTodos(currentPage: number): TodoModel[] {
    let todosPage: TodoModel[];
    todosPage = [];
    for (let i = 0; i < 5 && (currentPage - 1) * 5 + i < this.todos.length; i++) {
      todosPage.push(this.todos[(currentPage - 1) * 5 + i]);
    }
    return todosPage;
  }

  public removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
    this.totalPages = Math.floor(this.todos.length / 5) + 1;
  }

  public changeTodo(id: number, text: string): void {
    this.todos.filter((todo) => todo.id === id)[0].text = text;
    this.todos.filter((todo) => todo.id === id)[0].done = false;
    this.todos.filter((todo) => todo.id === id)[0].todoTextStyle = 'notDone';
    this.saveTodos();
  }

  public changeDone(id: number, done: boolean): void {
    this.todos.filter((todo) => todo.id === id)[0].done = done;
    this.todos.filter((todo) => todo.id === id)[0].todoTextStyle = done ? 'done' : 'notDone';
    this.saveTodos();
  }

  public removeAll(): void {
    this.todos = [];
    this.nextId = 0;
    this.saveTodos();
    this.totalPages = Math.floor(this.todos.length / 5) + 1;
  }
}
