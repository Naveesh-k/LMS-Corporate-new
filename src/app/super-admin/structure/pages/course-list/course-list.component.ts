import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminApiServiceService } from 'src/app/super-admin/super-admin-service/super-admin-api-service.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnInit {
  sales: any =[];
  listOfData: any = []
  constructor(public _services:SuperAdminApiServiceService, private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    this.courseList()
  }

  courseList() {
   this._services.coursesList().subscribe(res => {
       this.listOfData = res.data
       console.log( this.listOfData)
     })
  }



}
