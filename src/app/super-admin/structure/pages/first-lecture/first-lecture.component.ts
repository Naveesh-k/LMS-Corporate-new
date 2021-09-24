import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminApiServiceService } from 'src/app/super-admin/super-admin-service/super-admin-api-service.service';
@Component({
  selector: 'app-first-lecture',
  templateUrl: './first-lecture.component.html',
  styleUrls: ['./first-lecture.component.scss']
})
export class FirstLectureComponent implements OnInit {
  editor:any = Editor;
  html: any ='';
  constructor(public _services:SuperAdminApiServiceService, private toastr: ToastrService ,public router: Router) { }

  ngOnInit(): void {
    // text- editor
  this.editor = new Editor();
  // this.createLeacture()
  }

//   createLeacture() {
//     let request = {
//       url : ,
//       key_point :
//      }
//     this._services.leactureCreate(request).subscribe(res => {
//         let response = res
//         console.log(response)
//       })
//  }

}
