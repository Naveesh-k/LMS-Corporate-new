import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service'; // dark-light
import Swal from 'sweetalert2'
@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  darkMode: boolean = false; // dark-light
  title: any;
  profileRecord: any = []
  social:any;
  profileName: any ;
  profileCompany: any ;
  profileImage: any ;
  signupFullName: any;
  profile: any;
  companyName: any;
  constructor(public _service: GobalService,
    public router: Router,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.profileData()
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

     // get User name form local storage
     this.social = localStorage.getItem('signupMode')
     if (this.social === 'true') {
       let getLocalStorage: any = localStorage.getItem('userDetail');
       let signUpData = JSON.parse(getLocalStorage);
       console.log(signUpData,'71 header')
       this.signupFullName = signUpData.firstName + " " + signUpData.lastName
       console.log(signUpData.photoUrl, '73 header')
       this.profile = signUpData.photoUrl;

       this.companyName = signUpData.companyName
       console.log('Social 77', this.signupFullName)
     } else {
       let normalUserFName = localStorage.getItem('firstName')
       let normalUserLName = localStorage.getItem('lastName')
       this.profile = localStorage.getItem('profile');
       console.log(this.profile, '82 header')
       this.signupFullName = normalUserFName + ' ' + normalUserLName
       // profile
       console.log('85 normal data', this.signupFullName)
     }
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
    Swal.fire({
      title: 'Are you sure want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        this.router.navigateByUrl("/lms/auth")
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl("/lms/app/home"),
        Swal.fire(
          'Cancelled',

        )
      }
    })
  }

  profileData() {
    // this.spinner.show();
    this._service.profileDataShow().subscribe(res => {
        let profileObj:any = {}

        this.profileRecord = res.data
        this.profileRecord.forEach((el:any)=>{
          profileObj = el
        })
        // this.spinner.hide();
        this.profileName = profileObj.first_name+' '+profileObj.last_name
        this.profileCompany = profileObj.companyName
        this.profileImage =profileObj.profile
        console.log(this.profileImage)
      })
   }

}
