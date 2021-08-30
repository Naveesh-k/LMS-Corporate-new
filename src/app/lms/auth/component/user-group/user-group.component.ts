import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  darkMode: boolean = false;
  constructor(
    public mode: ColorModeService // dark-light
  ) { }

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



}
