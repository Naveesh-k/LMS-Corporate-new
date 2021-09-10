import { Component, OnInit } from '@angular/core';
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
  constructor(public mode: ColorModeService) {}

  ngOnInit(): void {
    // dark mode
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


}
