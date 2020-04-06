import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { CommentsComponent } from './comments/comments.component';
import { PhotosComponent } from './photos/photos.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  { path: '', redirectTo: 'comments', pathMatch: 'full'},
  { path: 'comments', component: CommentsComponent },
  { path: 'photos', component: PhotosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    PhotosComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ApiService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }