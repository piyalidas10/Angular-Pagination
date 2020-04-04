import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemsPerPage;
  @Input() pageSize;
  @Input() initialPage;
  @Input() currentPage;
  pages = [];
  newPages = [];
  selectedIndex = 0;
  @Output() nowInPage = new EventEmitter<any>();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    /*
    If you use index in your ngFor loop all you need to create
    is an empty array with the correct length:
    */
    this.pages = Array(this.pageSize); // n = 25 in your case
    console.log('pages => ', this.pages, typeof(this.pages));
    this.nowInPage.emit(this.selectedIndex);
  }

  ngOnChanges() {}

  changepage(val) {
    console.log('chagepage is clicked');
    this.selectedIndex = val;
    console.log('Current page => ', val + 1);
    this.nowInPage.emit(this.selectedIndex);
  }

  // paginationDots(val) {
  //   console.log('Newpages => ', this.newPages);
  //   this.newPages = [];
  //   this.newValue = val;
  //   console.log('val => ', val);
  //   const goto = val + 5;
  //   for (let i = val; i < goto; i++) {
  //     this.newPages.push(i);
  //   }
  //   this.cdRef.detectChanges();
  //   console.log('Newpages => ', this.newPages);
  // }

}
