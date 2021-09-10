import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { Location } from '@angular/common'
import { LmsAuthService } from '../../../../lms/auth/Service/lms-auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  loginData: any;
  login: any ;
  submitted = false;
  darkMode: boolean = false;
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private location : Location,
    private formBuilder: FormBuilder,
    public _services:LmsAuthService,
    public _service:GobalService,
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
  back() {
    // this.location.back()
    this.router.navigateByUrl('/lms/auth')
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }



  // Login API
  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    try {
      let request = {
            email: this.loginForm.value.email,
            password : this.loginForm.value.password,
      }
      // this.spinner.show();
      this._services.getLogin(request).subscribe(res => {
        this.login = res;
        let token = this.login.data.tokens
        localStorage.setItem("token", token);
        localStorage.setItem("loginUserFname", this.login.data.first_name)
        localStorage.setItem("loginUserLname", this.login.data.last_name)

        if(this.login.success === true){
          if(this.login.status === 401){
            this.toastr.error('Session expire', 'Session expire please login again')
          }
          localStorage.setItem('userType','true')
          this.toastr.success('message', this.login.message)
          localStorage.setItem('lms_isLogedIn', 'true')
          this.router.navigateByUrl('/lms/app/home')
        } else if (this.login.success === false){
          this.toastr.error('message', this.login.message)
          }
      },(error) => {
        if(this.login.status === 401){
          this.toastr.error('message', this.login.message)
        }
      }
      )
    }
    catch(err){
      this.spinner.hide();
    }
  }


  signUp(data: any) {
    console.log(data);
    let request:any = {
      profile:        data.photoUrl,
      provider:       data.provider,
      email:          data.email,
      size_of_team:   0,
      on_boarding:    0,
      experience:     0,
      first_name:     "",
      last_name:      "",
      password:       "",
      group_val:      "",
      market:         "",
      location:       "",
      contact_number: "",
      category:       "",
      topic:          "",
      industry:       "",
      position:       "",
      job_title :     "",
      customize_topic: []
    }
     if(data.provider === 'GOOGLE'){
       request['social_id'] =  data.idToken;
     } else if (data.provider === 'FACEBOOK'){
        request['social_id'] =  data.authToken;
     } else {
      request['social_id'] =  data.idToken;
     }
    console.log(request)
    this.spinner.show(); // Spinner show
    this._service.getSignUpData(request).subscribe(res => {
      let response = res;
      if(response.success == true){
        this.spinner.hide(); // Spinner hide
      }
      // ------------------- Spinner
      // this.spinner.show();
      // setTimeout(() => {
      //   this.spinner.hide();
      // }, 1000);
      // ------------------- Spinner end
      if(response.success == true){
        this.router.navigateByUrl('/lms/auth/sign-up')
      }else{
        // this.router.navigateByUrl('/lms/auth/login')
        this.router.navigateByUrl('/lms/app/home')
      }
      console.log(response)
    })
  }



}
