import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-dash-var',
  templateUrl: './dash-var.component.html',
  styleUrls: ['./dash-var.component.scss'],
})
export class DashVarComponent implements OnInit {
  darkMode: boolean = false;
  hide: boolean = false;
  show: boolean = true;
  constructor(
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

  hideShow() {  // Quiz show
    this.hide = true
  }
  showHide(){
    this.hide = false 
  }
}
