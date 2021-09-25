import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm: any = FormGroup;
  registerFormSec: any = FormGroup;
  hideFilledForm: boolean = false;
  hideFilledForm1: boolean = false;
  submitted = false;
  submittedSec = false;
  checkSignUptype: boolean = false;
  darkMode: boolean = false;
  formData = new FormData();
  showSelect: boolean = false;
  signUpData: any = {};
  customizeTopic: any = [];
  topics: any = [{
    'name': 'Road To IPO',
    'active': false,
  },
  {
    'name': 'Entrepreneurship',
    'active': false,
  },
  {
    'name': 'Capital Raising',
    'active': false,
  },
  {
    'name': 'Trade Finance',
    'active': false,
  },
  {
    'name': 'Investing',
    'active': false,
  },
  {
    'name': 'CrowdFunding',
    'active': false,
  },
  {
    'name': 'Business Law',
    'active': false,
  },
  {
    'name': 'Merger & Acquisitions',
    'active': false,
  }];

  profilepic: any = ''
  tokenId: any = ''
  provider: any = ''
  showPasswordField: boolean = false;
  cpFormfir: boolean = false;
  cpFormSec: boolean = false;
  imagePath: any;
  imageFile: any;
  uploadedImage: any;
  profileName: any;
  profileRecord: any = [];

  constructor(public router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public _service: GobalService, // api
    public mode: ColorModeService // dark-light
  ) { }

  ngOnInit(): void {
    let checkSignup: any = localStorage.getItem('signupType')
    this.checkSignUptype = checkSignup === 'true'
    let getLocalStorage: any = localStorage.getItem('userDetail');
    let signUpData: any = JSON.parse(getLocalStorage);
    if (signUpData && signUpData.photoUrl) {
      this.profilepic = this.checkSignUptype ? signUpData.photoUrl : '';
      let idToken = ''
      if (signUpData.provider === 'GOOGLE') {
        idToken = signUpData.idToken
      } else if (signUpData.provider === 'FACEBOOK') {
        idToken = signUpData.id
      } else if (signUpData.provider === 'LINKEDIN') {
        idToken = signUpData.userId
      }
      this.tokenId = idToken ? idToken : '';
      this.provider = this.checkSignUptype ? signUpData.provider : '';

      console.log(this.provider)
    }

    this.registerForm = this.formBuilder.group({
      firstName: this.checkSignUptype ? signUpData.firstName : '',
      lastName: this.checkSignUptype ? signUpData.lastName : '',
      email: this.checkSignUptype ? signUpData.email : '',
      profile: '',
      password: '',
      social_id: '',
      group_val: '',
      category: '',
      topic: '',
      industry: '',
      position: '',
      jobTitle: '',
      companyName: '',
      location: '',
      teamSize: '',
      experience: '',
      market: '',
      provider: '',
      contactNumber: '',
      customizeTopic: []
    });

    // -----------------------------------------------------------------
    // let unamePattern = "^[a-z0-9_-]{8,15}$";
    // let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    // this.registerForm = new FormGroup({
    //     firstName : new FormControl('',[Validators.pattern(unamePattern)]),
    //     lastname  : new FormControl('',[Validators.pattern(unamePattern)]),
    //     email     : new FormControl('',[Validators.pattern(emailPattern)]),
    //     profile   : new FormControl('',[Validators.required]),
    //     password  : new FormControl('',[Validators.required]),
    //     social_id : new FormControl(''),
    //     provider  : new FormControl('',[Validators.required]),
    //     category  : new FormControl('',[Validators.required]),
    //     topic     : new FormControl('',[Validators.required]),
    //     industry  : new FormControl('',[Validators.required]),
    //     position  : new FormControl('',[Validators.required]),
    //     job_title : new FormControl('',[Validators.required])
    // })

    // -----------------------------------------------------------------


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

  // for next page
  onSubmit() {
    let checkLink = localStorage.getItem("pageLink")
    if (checkLink === 'Courses Provider') {
      // this.router.navigateByUrl('/lms/auth/cp-sign-up')
      window.location.href = "/lms/auth/cp-sign-up";
    } else {
      this.submitted = true;
      this.hideFilledForm = true;
      this.hideFilledForm1 = true;
      this.showSelect = false;
      this.signUpData = this.registerForm.value
    }
  }


  courseProvider() {
    this.cpFormfir = false;
    this.cpFormSec = true;
    this.hideFilledForm = true;
    this.hideFilledForm1 = true;
    this.showSelect = false;
    this.signUp()
  }

  nextForm() {
    this.hideFilledForm1 = false;
    this.showSelect = true;
    this.submittedSec = true;
    // if (this.registerFormSec.invalid) {
    //   return;
    // }
  }

  signUp() {

    if (this.checkSignUptype) {
      console.log("it goes from social 200", this.checkSignUptype)
      localStorage.setItem('signupMode', 'true')
      this.showPasswordField = false;
      let extraVariable = {
        group: '',
        market: '',
        location: '',
        size_of_team: '1',
        contact_number: '',
        category: '',
        password: '',
        topic: '',
        on_boarding: '1'
      }
      this.signUpData = { ...this.signUpData, ...this.registerFormSec.value, ...extraVariable, ...this.registerForm.value }
      this.signUpData['profile'] = this.profilepic
      this.signUpData['social_id'] = this.tokenId
      this.signUpData['provider'] = this.provider
      console.log('this is sign up data', this.signUpData);
      this._service.getSignUpData(this.signUpData).subscribe(res => {
        let response = res
        localStorage.setItem('token', response.data.tokens)
        console.log('230 signUp', response)
        if (response.success) {
          // this.router.navigateByUrl('/lms/app/home')
          localStorage.setItem("userType", 'false');
          console.log('social sign me if condition run 235 signup page')
          console.log("228 checkuser type", localStorage.getItem("userType"))
          window.location.href = "/lms/app/home";
          this.profileData()
        }
        else {
          console.log("Exist User", response.success);
          console.log('social sign me else condition run 241 signup page')
          // this.router.navigateByUrl('/lms/app/home')
          this.toastr.success('message', response.message);
          localStorage.setItem("userType", 'true');
          window.location.href = "/lms/app/home";
          this.profileData()
        }
      })
    }
    else {
      this.showPasswordField = true;
      console.log("Its goes from normal 243")
      let request = {
        size_of_team: 0,
        on_boarding: 0,
        experience: this.registerForm.value.experience,

        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        customize_topic: this.customizeTopic,
        position: this.registerForm.value.position,
        companyName: this.registerForm.value.companyName,
        profile: this.uploadedImage.location,
        industry: this.registerForm.value.industry,
        job_title: this.registerForm.value.jobTitle,

        password: this.registerForm.value.password,
        location: this.registerForm.value.location,
        // size_of_team  : this.registerForm.value.teamSize,
        market: this.registerForm.value.market,
        provider: this.registerForm.value.provider,
        contact_number: this.registerForm.value.contactNumber,
        social_id: "",
        group_val: "",
        category: "",
        topic: "",
      }

      console.log(request, '274')
      localStorage.setItem('firstName', request.first_name)
      localStorage.setItem('lastName', request.last_name)
      localStorage.setItem('profile', request.profile)
      console.log(localStorage.getItem('profile'), 'Profile Image 285 signup')
      this._service.getSignUpEmail(request).subscribe(res => {
        let response = res

        console.log('280 signUp', response)

        localStorage.setItem('token', response.data.tokens)
        this.profileData()
        if (response.success === true) {
          console.log(response.success)
          // this.router.navigateByUrl('/lms/app/home')
          window.location.href = "/lms/app/home";
        } else if (response.success === false && response.message === 'employee email already exist') {
          // this.router.navigateByUrl('/lms/app/home')
          window.location.href = "/lms/app/home";
        }
      })
    }

  }
  selectedTopics(item: any) {
    this.topics.forEach((element: any) => {
      if (item.name === element.name) {
        element.active = !item.active;
        let index = this.customizeTopic.indexOf(element.name)
        element.active ?
          this.customizeTopic.push(element.name) :
          this.customizeTopic.splice(index, 1)
      }
    })
    console.log(this.customizeTopic)
  }

  done() {
    this.signUpData['customize_topic'] = this.customizeTopic
    console.log("run")
    this.signUp()
  }

  imageUplaoad(event: any) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    var formData = new FormData();
    formData.append('image', event.target.files[0]);

    if (
      event.target.files[0] &&
      allowedMimeTypes.includes(event.target.files[0].type)
    ) {
      this.imagePath = event.target.files;
      this.imageFile = this.imagePath[0];
    }

    console.log(formData)
    this._service.uploadImage(formData).subscribe(res => {
      this.uploadedImage = res.image
      localStorage.setItem('profileImg', this.uploadedImage.location)
    })
  }

  profileData() {
    this._service.profileDataShow().subscribe(res => {
      let profileObj: any = {}
      console.log(res, 'signup ts 341 profile data')
      this.profileRecord = res.data
      this.profileRecord.forEach((el: any) => {
        profileObj = el
      })
      this.profileName = profileObj.first_name + ' ' + profileObj.last_name
      console.log(profileObj.companyName, 'sadaaaaaaaaa')
    })
  }

}
