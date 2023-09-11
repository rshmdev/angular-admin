import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  expanded: boolean = false;

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

  togleSideBar() {
    const sidebar = document.querySelector('.header');
    this.expanded = !this.expanded;
    if (this.expanded) {
      sidebar?.classList.add('expanded');
    } else {
      sidebar?.classList.remove('expanded');
    }
  }
}
