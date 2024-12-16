import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage : number = 1;
  @Input() loading : boolean = false;
  @Input() dataLength : number = 0;

  @Output() nextPage = new EventEmitter<void>
  @Output() previousPage = new EventEmitter<void>

  onNextPage(){
    this.nextPage.emit()
  }
  onPreviousPage(){
    this.previousPage.emit();
  }
}
