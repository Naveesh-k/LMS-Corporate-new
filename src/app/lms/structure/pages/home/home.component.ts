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
  signUpData: any;
  signupFullName: any;
  fullName: any;
  checkUser: any;
  constructor(
    private spinner: NgxSpinnerService,
    public mode: ColorModeService // dark-light
  ) { }

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
    let userType: any = localStorage.getItem('userType')
    this.checkUser = userType === 'true'

    if (this.checkUser) {


      let userFName = localStorage.getItem('loginUserFname')
      let userLName = localStorage.getItem('loginUserLname')
      this.fullName = userFName + ' ' + userLName

    }
    else {
      let social = localStorage.getItem('signupMode')
      let checkSocial = social === 'true'
      if (checkSocial) {
        let getLocalStorage: any = localStorage.getItem('userDetail');
        let signUpData = JSON.parse(getLocalStorage);
        this.signupFullName = signUpData.firstName + " " + signUpData.lastName
        console.log('Social signup data', this.signupFullName)
      } else {
        let normalUserFName = localStorage.getItem('firstName')
        let normalUserLName = localStorage.getItem('lastName')
        this.signupFullName = normalUserFName + ' ' + normalUserLName
        console.log('Normal data', this.signupFullName)
      }
    }
  }


}
