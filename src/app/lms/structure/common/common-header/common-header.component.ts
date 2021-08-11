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
      case '/pages/home':
        this.title = 'DASHBOARD';
        break;
      case '/pages/my-course':
        this.title = 'MY COURSE';
        break;
      case '/pages/explore':
        this.title = 'EXPLORE';
        break;
      case '/pages/board':
        this.title = 'BOARD';
        break;
      case '/pages/profile':
        this.title = 'PROFILE';
        break;
      case '/pages/setting':
        this.title = 'SETTING';
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
}
