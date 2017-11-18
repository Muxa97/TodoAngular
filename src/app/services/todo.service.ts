import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoService {

  public todos: TodoModel[];
  public nextId: number;
  public totalPages: number;

  constructor() {
    let nextId = localStorage.getItem('nextId') || '0';
    if (nextId === 'NaN') {
      nextId = '0';
    }
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
    this.todos.push(todo);
    this.nextId++;
    this.saveTodos();
    this.totalPages = Math.floor(this.todos.length / 5) + 1;
    if (this.todos.length % 5 === 0 && this.todos.length !== 0) {
      this.totalPages--;
    }
  }

  public getTodos(currentPage: number): TodoModel[] {
    this.todos.reverse();
    let todosPage: TodoModel[];
    todosPage = [];
    for (let i = 0; i < 5 && (currentPage - 1) * 5 + i < this.todos.length; i++) {
      todosPage.push(this.todos[(currentPage - 1) * 5 + i]);
    }
    this.todos.reverse();
    return todosPage;
  }

  public removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
    this.totalPages = Math.floor(this.todos.length / 5) + 1;
    if (this.todos.length % 5 === 0 && this.todos.length !== 0) {
      this.totalPages--;
    }
  }

  public changeTodo(id: number, text: string): void {
    this.todos.filter((todo) => todo.id === id)[0].text = text;
    this.todos.filter((todo) => todo.id === id)[0].done = false;
    this.saveTodos();
  }

  public changeDone(id: number, done: boolean): void {
    this.todos.filter((todo) => todo.id === id)[0].done = done;
    this.saveTodos();
  }

  public removeAll(): void {
    this.todos = [];
    this.nextId = 0;
    this.saveTodos();
    this.totalPages = 1;
  }

  public changeOrder(todo: TodoModel, offset: number): void {
    let i = this.todos.indexOf(todo);
    if (i + offset >= 0 && i + offset < this.todos.length) {
      this.todos[i] = this.todos[i + offset];
      this.todos[i + offset] = todo;
      this.saveTodos();
    }
  }
}
