import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigatePortalComponent } from './navigate-portal/navigate-portal.component';
@NgModule({
  declarations: [AppComponent, HomePageComponent, NavigatePortalComponent],
  imports: [BrowserModule, AppRoutingModule, SlickCarouselModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
