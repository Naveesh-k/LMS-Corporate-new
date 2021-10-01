import { Component, OnInit } from '@angular/core';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-dash-var',
  templateUrl: './dash-var.component.html',
  styleUrls: ['./dash-var.component.scss'],
})
export class DashVarComponent implements OnInit {
  darkMode: boolean = false;
  hide: boolean = false;
  show: boolean = true;
  showId:any =localStorage.getItem('courseId');
  lectureList:any;
  video:any;
  quiz:any;
  constructor(
    public _service: GobalService,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    // this.listOfQuiz()
    console.log(localStorage.getItem('courseId'))
    this.listOfLecture()
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

  hideShow() {  // Quiz show
    this.hide = true
  }
  showHide(){
    this.hide = false
  }

  // Lecture list
listOfLecture() {
  this._service.lectureList(this.showId).subscribe(res => {
    this.lectureList = res.data;
    this.video = res.data.url
    res.data.forEach((el:any)=>{
      el.key_point = this.htmlToPlaintext(el.key_point)
    })
    // console.log(this.lectureList)

  })
}

htmlToPlaintext(text:any) {
  return String(text).replace(/<[^>]+>/gm, '')
}

// listOfQuiz() {
//   console.log(this.showId, '62')
//   this._service.quizList(this.showId).subscribe(res => {
//     this.quiz = res.data;
//     console.log(this.quiz, '64')
//     res.data.forEach((el:any)=>{
//       let check = el.questions
//       check.
//     })
//     console.log(this.lectureList)

//   })
// }


}
