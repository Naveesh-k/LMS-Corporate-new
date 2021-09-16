import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
@Component({
  selector: 'app-first-lecture',
  templateUrl: './first-lecture.component.html',
  styleUrls: ['./first-lecture.component.scss']
})
export class FirstLectureComponent implements OnInit {
  editor:any = Editor;
  html: any ='';
  constructor() { }

  ngOnInit(): void {
    // text- editor
  this.editor = new Editor();
  }

}
