import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminApiServiceService } from 'src/app/super-admin/super-admin-service/super-admin-api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  createCourse:any= FormGroup;
  submitted = false;
  loginToken:any
  constructor(private formBuilder: FormBuilder, public _services:SuperAdminApiServiceService, private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {

    this.createCourse = this.formBuilder.group({
      courseTitle: ['', Validators.required],
      courseProvider: ['', Validators.required],
      description: ['', Validators.required],
      datePicker: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    })

  }

   // convenience getter for easy access to form fields
   get f() { return this.createCourse.controls; }

   onSubmit() {
      //  this.submitted = true;
      //  if (this.createCourse.invalid) {
      //      return;
      //  }
      let request = {
        // courseTitle: this.createCourse.value.courseTitle,
        // courseProvider : this.createCourse.value.courseProvider,
        // description : this.createCourse.value.description,
        // start_date : this.createCourse.value.datePicker,
        // status: '0'
        course_title: this.createCourse.value.courseTitle,
        select_author : this.createCourse.value.courseProvider,
        course_subtitle : this.createCourse.value.description,
        // start_date : this.createCourse.value.datePicker,
        status: '0'
  }
  // this.spinner.show();
      this._services.createCourses(request).subscribe(res => {
          let response = res
          console.log(response)
          // this.toastr.success('message', response.message)
          this.router.navigateByUrl('/super/app/leacture-list')
          // if(response.success == true){
          //   this.router.navigateByUrl('/super/app/list')
          // }
        })
   }

}
