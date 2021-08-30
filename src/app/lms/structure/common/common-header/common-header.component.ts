import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service'; // dark-light

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  darkMode: boolean = false; // dark-light
  title: any;
  constructor(
    public router: Router,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    let route = this.router.url;
    console.log(route);
    switch (route) {
      case '/lms/app/home':
        this.title = 'DASHBOARD';
        break;
      case '/lms/app/dash-var':
        this.title = 'DASHBOARD';
        break;
      case '/lms/app/my-course':
        this.title = 'MY COURSE';
        break;
      case '/lms/app/explore':
        this.title = 'EXPLORE';
        break;
      case '/lms/app/board':
        this.title = 'BOARD';
        break;
      case '/lms/app/profile':
        this.title = 'PROFILE';
        break;
      case '/lms/app/bulletin-board':
        this.title = 'BULLETIN BOARD';
        break;
      case '/lms/app/setting':
        this.title = 'SETTINGS';
    }

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

  // dark-light
  dark(e: any) {
    console.log(e);
    if (e) {
      this.mode.changeMode('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      this.mode.changeMode('light');
      localStorage.setItem('mode', 'light');
    }
  }
  //end dark-light

  // Logout
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl("/lms/auth/login")
  }
}
