import { Component, OnInit } from '@angular/core';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  hide: boolean = true;
  darkMode: boolean = false;
  showId:any = localStorage.getItem('courseId');
  lecture:any
  constructor(public _service: GobalService,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.courseList()
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

  // hide show section
  showHide() {
    this.hide = false;
  }


  courseList() {
    try{
      this._service.getCourse().subscribe(res => {
        this.lecture  = res.data;
        console.log(this.lecture)
      })
    } catch(error){
      console.log(error)
    }
}
}
