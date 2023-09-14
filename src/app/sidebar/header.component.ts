import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserData();
  }

  sidebarItens = [
    {
      route: '/dashboard',
      name: 'Dashboard',
      icon: '',
    },
    {
      route: '/products',
      name: 'Products',
      icon: '',
    },
    {
      route: '/banners',
      name: 'Banners',
      icon: '',
    },
    {
      route: '/security',
      name: 'Security',
      icon: '',
    },
  ];

  session_id = localStorage.getItem('session_id');

  userInfo: any = {};
  getUserData() {
    this.http
      .get(
        `https://api.themoviedb.org/3/account?api_key=4542968a6d88218f19699f74f8498ed9&session_id=${this.session_id}`
      )
      .subscribe((res: any) => {
        this.userInfo = res;
        localStorage.setItem('account_id', res.id);
      });
  }
}
