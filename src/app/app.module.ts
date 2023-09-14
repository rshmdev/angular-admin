import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './sidebar/header.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarItemComponent,
    DashboardViewComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularToastifyModule,
    SlickCarouselModule,
    NgOptimizedImage,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
