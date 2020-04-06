import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges,
  DoCheck, ChangeDetectionStrategy, IterableDiffers
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemsPerPage;
  @Input() initialPage;
  @Input() showPagesAtOneTime;
  @Input() dataLength;
  pages = [];
  newPages = [];
  selectedIndex = 0;
  @Output() nowInPage = new EventEmitter<any>();
  paginationObj = {
    currentPage: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    pages: []
  };

  constructor(
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers
  ) { }

  ngOnInit() {
    this.nowInPage.emit(this.selectedIndex);
    this.goToPage(this.selectedIndex);
  }

  ngOnChanges() { }

  goToPage(currentPage: number) {
    if (currentPage < 0 || currentPage > this.pages.length - 1) {
      this.selectedIndex = 0;
    }
    console.log('Current page => ', currentPage + 1);
    this.paginationObj = this.setPagination(this.dataLength, currentPage, this.itemsPerPage);
    console.log('paginationObj => ', this.paginationObj);
    this.nowInPage.emit(this.paginationObj['currentPage']);
  }

  setPagination(dataLength, currentPage: number, itemsPerPage: number) {
    console.log('Current page => ', currentPage + 1);
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    const pages = [];
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= this.showPagesAtOneTime) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= (this.showPagesAtOneTime - 1)) {
        startPage = 0;
        endPage = this.showPagesAtOneTime - 1;
        console.log('Loop1---------------------', startPage, endPage);
      } else if (currentPage + 1 >= totalPages - this.showPagesAtOneTime) {
        startPage = totalPages - this.showPagesAtOneTime;
        endPage = totalPages - 1;
        console.log('Loop2---------------------', startPage, endPage);
      } else {
        startPage = currentPage - (Math.floor(this.showPagesAtOneTime / 2) - 2);
        endPage = currentPage + (Math.floor(this.showPagesAtOneTime / 2) + 2);
        console.log('Loop3---------------------', startPage, endPage);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // return object with all pager properties required by the view
    const retrunObj = {
      currentPage,
      totalPages,
      startPage,
      endPage,
      pages
    };
    return retrunObj;
  }

}
