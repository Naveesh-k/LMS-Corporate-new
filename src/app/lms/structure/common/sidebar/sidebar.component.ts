import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  darkMode: boolean = false;
  sidebar:any;
  closeBtn:any;
  searchBtn:any;
  profileName: any ;
  profileCompany: any ;
  profileImage: any ;
  profileRecord: any = []
  social:any;
  signupFullName: any;
  profile: any;
  companyName: any;
  constructor(public mode: ColorModeService,public _service: GobalService,
    private spinner: NgxSpinnerService,) {}

  ngOnInit(): void {
    // dark mode
    this.profileData()
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    // end dark mode


    // get User name form local storage
    this.social = localStorage.getItem('signupMode')
      if (this.social === 'true') {
        let getLocalStorage: any = localStorage.getItem('userDetail');
        let signUpData = JSON.parse(getLocalStorage);
        this.signupFullName = signUpData.firstName + " " + signUpData.lastName
        this.profile = signUpData.profile;
        this.companyName = signUpData.companyName
        console.log('Social signup data', this.signupFullName)
      } else {
        let normalUserFName = localStorage.getItem('firstName')
        let normalUserLName = localStorage.getItem('lastName')
        this.profile = localStorage.getItem('profile');
        this.signupFullName = normalUserFName + ' ' + normalUserLName
        // profile
        console.log('Normal data', this.signupFullName)
      }
  }

  loadSidebar(){

   this.sidebar = document.querySelector(".sidebar");
   this.closeBtn = document.querySelector("#btn");
   this.searchBtn = document.querySelector(".bx-search");

  this.closeBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("open");
      this.menuBtnChange();
  });

  this.searchBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("open");
      this.menuBtnChange();
  });
  }


   menuBtnChange() {
      if (this.sidebar.classList.contains("open")) {
          this.closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
      } else {
          this.closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
      }
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
