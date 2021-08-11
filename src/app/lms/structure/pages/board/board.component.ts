import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  hide: boolean = false;
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
  // slider
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  hideShow() {
    this.hide = true;
  }
}
