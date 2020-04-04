import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  links = ['comments', 'photos'];
  selectedIndex = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('links => ', this.links);
  }

  changeRoute(routeValue) {
    this.router.navigate([routeValue]);
  }
}
