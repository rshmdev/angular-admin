import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoginPage = this.router.url === '/login';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/login';
      }
    });
  }
  title = 'first-angular-project';
}
