import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm: any = FormGroup;
  registerFormSec: any = FormGroup;
  hideFilledForm:boolean = false;
  hideFilledForm1:boolean = false;
  submitted = false;
  submittedSec = false;
  checkSignUptype: boolean = false;
  darkMode: boolean = false;
  formData = new FormData();
  showSelect: boolean = false;
   signUpData:any = {};
   customizeTopic : any = [];
  topics: any = [{
    'name': 'Road To IPO',
    'active':false,
  },
  {
    'name': 'Entrepreneurship',
    'active':false,
  },
  {
    'name': 'Capital Raising',
    'active':false,
  },
  {
    'name': 'Trade Finance',
    'active':false,
  },
  {
    'name': 'Investing',
    'active':false,
  },
  {
    'name': 'CrowdFunding',
    'active':false,
  },
  {
    'name': 'Business Law',
    'active':false,
  },
  {
    'name': 'Merger & Acquisitions',
    'active':false,
  }];

  profilepic:any = ''
  tokenId:any = ''
  provider:any = ''

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    public _service:GobalService, // api
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
      let checkSignup:any = localStorage.getItem('signupType')
      this.checkSignUptype = checkSignup === 'true'

      console.log(this.checkSignUptype)


        let getLocalStorage:any =  localStorage.getItem('userDetail');
        let signUpData:any = JSON.parse(getLocalStorage);
        if (signUpData && signUpData.photoUrl) {
          this.profilepic = this.checkSignUptype ? signUpData.photoUrl : '';
          this.tokenId = this.checkSignUptype ? signUpData.idToken :'';
          this.provider = this.checkSignUptype ? signUpData.provider: '';
          console.log(this.provider)
        }

        this.registerForm = this.formBuilder.group({
          firstName: this.checkSignUptype ? signUpData.firstName : '',
          lastName: this.checkSignUptype ? signUpData.lastName: '',
          email: this.checkSignUptype ? signUpData.email: '',
          profile: '',
          // ------------
          password:'',
          social_id:'',
          provider:'',
          group_val:'',
          category:'',
          topic:'',
          industry:'',
          position:'',
          job_title:'',
        });

        this.registerFormSec = this.formBuilder.group({
          industry: ['', Validators.required],
          position: ['', Validators.required],
          jobTitle: ['', Validators.required],
          experience: ['', [Validators.required]]
        });

        console.log(this._service.globalObject)




    // dark-light
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light

    // Check sign-up Type
    // end Check sign-up Type


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  get f1() {
    return this.registerFormSec.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.hideFilledForm = true;
    this.hideFilledForm1 = true;
    this.showSelect = false;
    this.signUpData = this.registerForm.value
  }


nextForm(){
  this.hideFilledForm1 = false;
  this.showSelect= true;
  this.submittedSec = true;
// if (this.registerFormSec.invalid) {
    //   return;
    // }
}

  signUp() {

    console.log(this.checkSignUptype)

    if(this.checkSignUptype){

      let extraVariable = {
      group:'',
      market:'',
      location:'',
      size_of_team:'',
      contact_number:'',
      category:'',
      password:'',
      topic:'',
      on_boarding:'1'
    }
    this.signUpData = {...this.signUpData,...this.registerFormSec.value, ...extraVariable}
    this.signUpData['profile'] = this.profilepic
    this.signUpData['social_id'] = this.tokenId
    this.signUpData['provider'] = this.provider
    console.log(this.signUpData.provider)
    console.log(this.signUpData);
    this._service.getSignUpData(this.signUpData).subscribe(res => {
      let response = res
      if(response.success == false){
        this.router.navigateByUrl('/lms/app/home')
      }
      console.log(response)
    })
    }
  else {
    let request = {
      size_of_team:0,
      on_boarding: 0,
      experience: 0,

      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      customize_topic: this.registerForm.value.customize_topic,

      password: this.registerForm.value.password   ? this.registerForm.value.password: "",
      profile: this.registerForm.value.profile     ? this.registerForm.value.password: "",
      social_id: this.registerForm.value.social_id ? this.registerForm.value.password: "",
      provider: this.registerForm.value.provider   ? this.registerForm.value.password: "",
      group_val: this.registerForm.value.group_val ? this.registerForm.value.password: "",
      market: "",
      location: "",

      category:this.registerForm.value.category  ? this.registerForm.value.password: "",
      topic:this.registerForm.value.topic        ? this.registerForm.value.password: "",
      industry:this.registerForm.value.industry  ? this.registerForm.value.password: "",
      position: this.registerForm.value.position ? this.registerForm.value.password: "",
      job_title : this.registerForm.value.jobTitle? this.registerForm.value.password: "",
      contact_number: "",

    }



    this._service.getSignUpEmail(request).subscribe(res => {
      let response = res
      console.log(response)
      if(response.success == true || response.success == false){
        this.router.navigateByUrl('/lms/app/home')
      }
    })
  }

  }
  selectedTopics(item:any){
    this.topics.forEach((element:any)=>{
       if(item.name === element.name){
        element.active = !item.active;
        let index = this.customizeTopic.indexOf(element.name)
        element.active ?
          this.customizeTopic.push(element.name):
          this.customizeTopic.splice(index, 1)
       }
    })
    console.log(this.customizeTopic)
  }

  done(){
    this.signUpData['customize_topic'] =  this.customizeTopic
    console.log("run")
    this.signUp()
  }

}
