import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkMode: boolean = true;
  showButton: boolean = false;
  constructor(
    private location: Location,
    public router: Router,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {



    // dark-light
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light

    this.checkRoute()
  }

  checkRoute(){
      this.showButton = this.router.url === '/lms/auth/sign-up';
  }

  // back page location
  back(): void {
      this.location.back()
  }

}
