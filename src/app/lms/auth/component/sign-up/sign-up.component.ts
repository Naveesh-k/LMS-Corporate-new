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
    let getLocalStorage:any =  localStorage.getItem('userDetail');
    let signUpData:any = JSON.parse(getLocalStorage);
    // this.signUpData1 = JSON.parse(getLocalStorage);
    if (signUpData && signUpData.photoUrl) {
      this.profilepic = signUpData.photoUrl;
      this.tokenId = signUpData.idToken
      this.provider = signUpData.provider
      console.log(this.provider)
    }

    this.registerForm = this.formBuilder.group({
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      profile: '',
    });

    this.registerFormSec = this.formBuilder.group({
      industry: ['', Validators.required],
      position: ['', Validators.required],
      jobTitle: ['', Validators.required],
      experience: ['', [Validators.required]]
    });

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

  signUp() {
    this.hideFilledForm1 = false;
    this.showSelect= true;
    this.submittedSec = true;
    // if (this.registerFormSec.invalid) {
    //   return;
    // }
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
    console.log(this.signUpData)
    this._service.getSignUpData(this.signUpData).subscribe(res => {
      let response = res;
      if(response.success == false){
        // this.router.navigateByUrl('/lms/auth/login')
      }
      console.log(response)
    })
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
