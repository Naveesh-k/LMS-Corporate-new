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
  fullName: any;
  normalFullName: any;
  checkUser: any;
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

    /*get localStorage data
    for show profile name*/
    let getLocalStorage:any =  localStorage.getItem('userDetail');
    this.signUpData = JSON.parse(getLocalStorage);
    console.log(this.signUpData)
    console.log('Social signup data',this.signUpData.name)

    let userFName = localStorage.getItem('loginUserFname')
    let userLName = localStorage.getItem('loginUserLname')
    this.fullName = userFName+' '+userLName
    console.log('Login data',this.fullName)

    let normalUserFName = localStorage.getItem('firstName')
    let normalUserLName = localStorage.getItem('lastName')
    this.normalFullName = normalUserFName+' '+normalUserLName
    console.log('Normal data',this.normalFullName)

    let userType = localStorage.getItem('userType')
    console.log(userType)

    this.checkUser = userType  === 'true'
  }

}
