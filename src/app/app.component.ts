import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchString: string = '';
  token: any;
  constructor(private router: Router, private as: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.token = this.as.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: `${this.searchString}` },
    });
    this.searchString = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {}
}
