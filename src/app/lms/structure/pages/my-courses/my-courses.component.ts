import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
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
  // slideConfig = { slidesToShow: 4, slidesToScroll: 4};
  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 4,
    'arrows': true,
    'swipeToSlide': true,
    'infinite': true,
    'responsive': [
      {
        'breakpoint': 767,

         'settings': {
          'infinite': false,
          'slidesToShow': 3
                }
              }
            ]
  };
}
