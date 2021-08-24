import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { Location } from '@angular/common'
import { LmsAuthService } from '../../../../lms/auth/Service/lms-auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  loginData: any;
  submitted = false;
  darkMode: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    public router: Router,
    private location : Location,
    private formBuilder: FormBuilder,
    public _service:LmsAuthService,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false],
      },
      {
        // validator: MustMatch('password', 'confirmPassword')
      }
    );

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

  // back location
  back(): void {
    this.location.back()
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }



  // --------------------
  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // let request: any =  this.loginForm.value()
    let request = {
          email: this.loginForm.value.email,
          password : this.loginForm.value.password,
    }

    console.log(request)
    // this.spinner.show();
    this._service.getLogin(request).subscribe(res => {
      let response = res;

      if(response.success === true){
        // this.spinner.hide();
        this.router.navigateByUrl('/lms/app/home')
      }
    })
  }

  // --------------------

}
