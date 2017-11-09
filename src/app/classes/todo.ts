export class Todo {
  id: number;
  text: string;
  done: boolean;
  edit: boolean;
  todoTextStyle: string;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
    this.done = false;
    this.edit = false;
  }
}
