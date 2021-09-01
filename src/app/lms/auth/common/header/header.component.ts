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
  darkMode: boolean = false;
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
  }

  // back page location
  back(): void {
    if(this.router.navigateByUrl('/lms/auth')){
      this.showButton = false;
    }else if(this.router.navigateByUrl('/lms/auth/sign-up')){
      this.showButton = true;
      this.location.back()
    }
  }

}
