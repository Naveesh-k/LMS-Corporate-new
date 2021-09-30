import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { DataManipulationService } from '../../Service/data-manipulation.service';
@Component({
  selector: 'app-cp-sign-up',
  templateUrl: './cp-sign-up.component.html',
  styleUrls: ['./cp-sign-up.component.scss']
})
export class CpSignUpComponent implements OnInit {
  darkMode: boolean = false;
  registerForm: any = FormGroup;
  submitted = false;
  hide: boolean = false;
  profileImg:any;
  userType:any;
  constructor(
    public _service: GobalService,
    public _getDataService: DataManipulationService,
    public router: Router,
    public mode: ColorModeService,
    private formBuilder: FormBuilder
  ) { }

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

    this.registerForm = this.formBuilder.group({
      provider: ['', Validators.required],
      market: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      team: ['', Validators.required],
      contactNumber: ['', Validators.required],
  });
  }

  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // if (this.registerForm.invalid) {
        //     return;
        // }
        console.log()
        // this.router.navigateByUrl('/lms/app/cp-dash')

    }

    nextPage(){
      this.hide = !false;
    }

    signUp() {

      let data:any =localStorage.getItem('cpSignUp')
      let getCpSignUpData =JSON.parse(data)
      this.profileImg = localStorage.getItem('profileImg')
      this.submitted = true;
        // if (this.registerForm.invalid) {
        //     return;
        // }

        let user :any = localStorage.getItem('typeOfUser');
        this.userType = JSON.parse(user)
        console.log(this.userType.user_type)

        // let email:any = localStorage.getItem('fbloginemail')
        // localStorage.setItem("Signup 246" ,email)

        this._getDataService.dataService.subscribe(res => {
          console.log(res, 'djaldjaklsdjlasdjkksajdlasjkklsajdjaskldljasj')
          if(res.isFilled){
            console.log(res.signUpData)
          }
        })

        let request = {

          email: getCpSignUpData.signUpData.email,
          first_name: getCpSignUpData.signUpData.first_name,
          last_name: getCpSignUpData.signUpData.last_name,
          profile: this.profileImg,
          password: getCpSignUpData.signUpData.password,
          provider: this.registerForm.value.provider,
          market: this.registerForm.value.market,
          experience: this.registerForm.value.experience,
          location: this.registerForm.value.location,
          size_of_team: this.registerForm.value.team,
          contactNumber: this.registerForm.value.contactNumber,
          on_boarding: 0,
          position: '',
          companyName: '',
          industry: '',
          job_title: '',
          social_id: "",
          group_val: "",
          category: "",
          topic: "",
          // ----------------------------------add paramter for userType
          user_type: this.userType.user_type,
          subscriber_type: this.userType.subscriber_type
          // ----------------------------------add paramter for userType

        }
        localStorage.setItem('firstName', request.first_name)
        localStorage.setItem('lastName', request.last_name)
        // localStorage.setItem('profile', request.profileImg)
        this._service.getSignUpEmail(request).subscribe(res => {
          let response = res
          if(res.success === true){
          localStorage.setItem('token', response.data.tokens)
          this.router.navigateByUrl('/lms/app/cp-dash')
          }
        })


    }

}
