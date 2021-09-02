import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColorModeService } from 'src/app/service/color-mode.service'; // dark-light

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  darkMode: boolean = false; // dark-light
  signUpData:any;
  constructor(
    private spinner: NgxSpinnerService,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
    // dark-light
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light

    // get local storage data
    let getLocalStorage:any =  localStorage.getItem('userDetail');
    this.signUpData = JSON.parse(getLocalStorage);
    console.log(this.signUpData.name,'Name check')
  }

}
