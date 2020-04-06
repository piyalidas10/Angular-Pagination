import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photosLists = [];
  totalLists = [];
  isLoading = true;
  itemsPerPage = 0;
  initialPage = 0;
  currentPage = 0;
  showPagesAtOneTime = 0;

  constructor(
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {
    this.itemsPerPage = 20;
    this.initialPage = 1;
    this.currentPage = 1;
    this.showPagesAtOneTime = 10;
    this.getPhotosList();
  }

  ngOnInit() {
  }

  getPhotosList() {
    try {
      this.apiService.getPhotos()
        .subscribe(
          data => {
            this.totalLists = data;
            this.isLoading = false;
          },
          err => {
            this.isLoading = false;
            console.log('Error => ', err);
          }
        );
    } catch (error) {
      this.isLoading = false;
      console.log('error => ', error);
    }
  }

  showDataPageWise(currentPage, data) {
    let start = 0;
    this.photosLists = [];
    if (currentPage > 0) {
      start = this.itemsPerPage * currentPage;
    } else {
      start = 0;
    }
    console.log('start => ', start);
    for (let i = start; i < (this.itemsPerPage * (currentPage + 1)); i++) {
      this.photosLists.push(data[i]);
    }
    console.log( 'Current Page Photos => ', this.photosLists);
    /*
    In dev mode change detection adds an additional turn after every regular change detection run to check if the model has changed.
    so, to force change detection run the next tick otherwise you will get error the following :
    "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    Previous value: 'ngIf: false'. Current value: 'ngIf: true'."
    */
    this.cdRef.detectChanges();
  }

  changeInPage(current) {
    console.log('current => ', current);
    this.showDataPageWise(current, this.totalLists);
  }

}
