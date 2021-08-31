import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-cp-dashboard',
  templateUrl: './cp-dashboard.component.html',
  styleUrls: ['./cp-dashboard.component.scss']
})
export class CpDashboardComponent implements OnInit {
  darkMode: boolean = false; // dark-light
  constructor(public mode: ColorModeService ) { }

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

}
