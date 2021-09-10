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
  signupFullName: any;
  fullName: any;
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

    console.log('jdasdhjaksdhkasjdhaksjdhaskjdhjks')

    /*get localStorage data
    for show profile name*/
    let socail = localStorage.getItem('signupMode')
    if(socail == 'true'){
      let getLocalStorage:any =  localStorage.getItem('userDetail');
      this.signUpData = JSON.parse(getLocalStorage);
      this.signupFullName = this.signUpData.name
      console.log('Social signup data',this.signUpData.name)
      console.log('Social signup data',this.signUpData.firstName)
      console.log('Social signup data',this.signUpData.lastName)
      console.log('Social signup data',this.signUpData)
     }else {
    let normalUserFName = localStorage.getItem('firstName')
    let normalUserLName = localStorage.getItem('lastName')
    this.signupFullName = normalUserFName+' '+normalUserLName
    console.log('Normal data',this.signupFullName)
     }

    let userFName = localStorage.getItem('loginUserFname')
    let userLName = localStorage.getItem('loginUserLname')
    this.fullName = userFName+' '+userLName
    console.log('Login data',this.fullName)



    let userType = localStorage.getItem('userType')
    console.log(userType)

    this.checkUser = userType  === 'true'
  }

}
