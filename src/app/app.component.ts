import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchString = '';
  title = 'Seneca Music';

  constructor(private router: Router) {}

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: `${this.searchString}` },
    });
    this.searchString = '';
  }
}
