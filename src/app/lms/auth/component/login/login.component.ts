import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { Location } from '@angular/common'
import { LmsAuthService } from '../../../../lms/auth/Service/lms-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;
  darkMode: boolean = false;
  constructor(
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
        acceptTerms: [false, Validators.requiredTrue],
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

    this.signIn()
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

    // this._service.getLogin('data').subscribe(res => {
    //   let response = res;
    //   if(response.success == false){
    //     this.router.navigateByUrl('/lms/auth/login')
    //   }
    //   console.log(response)
    // })
  }
  // --------------------

}
