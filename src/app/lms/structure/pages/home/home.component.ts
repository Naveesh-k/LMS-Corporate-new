import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
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
  checkUser: any = '';
  profileName: any ;


  profileRecord: any = []
  constructor(
    public _service: GobalService, // api
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

     this.profileData()


    /*get localStorage data
    for show profile name*/
    let userType: any = localStorage.getItem('userType')
    this.checkUser = userType
    if (this.checkUser === "true") {
      let social = localStorage.getItem('signupMode')
      if (social === 'true') {
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
    else {
      let userFName = localStorage.getItem('loginUserFname')
      let userLName = localStorage.getItem('loginUserLname')
      this.fullName = userFName + ' ' + userLName
    }

   
  }

  profileData() {
    
    this._service.profileDataShow().subscribe(res => {
      // this.spinner.show();
        let profileObj:any = {}

        console.log(res,'home ts 76 profile data ')

        this.profileRecord = res.data
        this.profileRecord.forEach((el:any)=>{
          profileObj = el
        })
        this.profileName = profileObj.first_name+' '+profileObj.last_name
        // if(this.profileRecord.success === true){
        //   this.spinner.hide();
        // }
      })
   }
}
