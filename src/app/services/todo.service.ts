import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';

@Injectable()
export class TodoService {

  public todos: Todo[];
  public nextId: number;

  constructor() {

    const todosStr = localStorage.getItem('todos');

    this.todos = JSON.parse(todosStr);
    if (!this.todos) {
      this.todos = [];
    }

    this.nextId = this.todos.length;
  }

  public saveTodos(): void {
    const todosStr = JSON.stringify(this.todos);
    localStorage.setItem('todos', todosStr);
  }

  public addTodo(text: string): void {
    if (text === '') {
      text = 'Do nothing';
    }
    const todo = new Todo(this.nextId, text);
    this.todos.push(todo);
    this.saveTodos();
    this.nextId++;
  }

  public getTodos(): Todo[] {
    return this.todos;
  }

  public removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.nextId--;
    this.saveTodos();
  }

  public changeTodo(id: number, text: string): void {
    this.todos[id].text = text;
    this.todos[id].done = false;
    this.saveTodos();
  }

  public changeDone(id: number, done: boolean): void {
    this.todos[id].done = done;
    this.saveTodos();
  }
}
