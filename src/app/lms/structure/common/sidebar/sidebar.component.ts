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
  profileRecord: any = []
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

    this.loadSidebar()
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
    console.log('sadasdasdadas')
    this.spinner.show();
    this._service.profileDataShow().subscribe(res => {
        let profileObj:any = {}

        this.profileRecord = res.data
        this.profileRecord.forEach((el:any)=>{
          profileObj = el
        })
        this.spinner.hide();
        console.log(profileObj,'sadasydasidyasuy')
        this.profileName = profileObj.first_name+' '+profileObj.last_name
        this.profileCompany = profileObj.companyName
      })
   }

}
