import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent {

  public currentPage = 1;

  constructor(public todoService: TodoService) { }

  public nextPage(): void {
    if (this.currentPage < this.todoService.totalPages) {
      this.currentPage++;
      if (this.currentPage > this.todoService.totalPages) {
        this.currentPage = this.todoService.totalPages;
      }
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.currentPage > this.todoService.totalPages) {
        this.currentPage = this.todoService.totalPages;
      }
    }
  }

}
