import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-customise-topic',
  templateUrl: './customise-topic.component.html',
  styleUrls: ['./customise-topic.component.scss'],
})
export class CustomiseTopicComponent implements OnInit {
  darkMode: boolean = false;
  constructor(
    public mode: ColorModeService // dark-light
  ) {}

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
