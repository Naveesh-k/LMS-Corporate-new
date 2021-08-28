import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigatePortalComponent } from './navigate-portal/navigate-portal.component';
// Import library module
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
// Import toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, HomePageComponent, NavigatePortalComponent],
  imports: [BrowserModule, AppRoutingModule, SlickCarouselModule, FormsModule,
     NgxSpinnerModule,
     HttpClientModule,
     CommonModule,
     BrowserAnimationsModule,
     ToastrModule.forRoot(), // Toaster
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
