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
  signUpData: any = {};
  userType:any;
  profilepic: any = ''
  tokenId: any = ''
  provider: any = ''
  checkSignUptype:boolean =false;
  constructor(
    public _service: GobalService,
    public _getDataService: DataManipulationService,
    public router: Router,
    public mode: ColorModeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {



    let checkSignup: any = localStorage.getItem('signupType')
    console.log(checkSignup,'90')
    this.checkSignUptype = checkSignup === 'true'
    let getLocalStorage: any = localStorage.getItem('userDetail');
    let signUpData: any = JSON.parse(getLocalStorage);
    console.log(signUpData, '94')
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

    // signUp() {

    //   let data:any =localStorage.getItem('cpSignUp')
    //   let getCpSignUpData =JSON.parse(data)
    //   this.profileImg = localStorage.getItem('profileImg')
    //   this.submitted = true;
    //     let user :any = localStorage.getItem('typeOfUser');
    //     this.userType = JSON.parse(user)
    //     console.log(this.userType.user_type)
    //     this._getDataService.dataService.subscribe(res => {
    //       console.log(res, 'djaldjaklsdjlasdjkksajdlasjkklsajdjaskldljasj')
    //       if(res.isFilled){
    //         console.log(res.signUpData)
    //       }
    //     })

    //     let request = {
    //       email: getCpSignUpData.signUpData.email,
    //       first_name: getCpSignUpData.signUpData.first_name,
    //       last_name: getCpSignUpData.signUpData.last_name,
    //       profile: this.profileImg,
    //       password: getCpSignUpData.signUpData.password,
    //       provider: this.registerForm.value.provider,
    //       market: this.registerForm.value.market,
    //       experience: this.registerForm.value.experience,
    //       location: this.registerForm.value.location,
    //       size_of_team: this.registerForm.value.team,
    //       contactNumber: this.registerForm.value.contactNumber,
    //       on_boarding: 0,
    //       position: '',
    //       companyName: '',
    //       industry: '',
    //       job_title: '',
    //       social_id: "",
    //       group_val: "",
    //       category: "",
    //       topic: "",
    //       user_type: this.userType.user_type,
    //       subscriber_type: this.userType.subscriber_type
    //     }
    //     localStorage.setItem('firstName', request.first_name)
    //     localStorage.setItem('lastName', request.last_name)
    //     this._service.getSignUpEmail(request).subscribe(res => {
    //       let response = res
    //       if(res.success === true){
    //       localStorage.setItem('token', response.data.tokens)
    //       this.router.navigateByUrl('/lms/app/cp-dash')
    //       }
    //     })


    // }

  //  -----------------------------------------------

  signUp() {

    let data:any =localStorage.getItem('cpSignUp')
    let getCpSignUpData =JSON.parse(data)
    this.profileImg = localStorage.getItem('profileImg')

    let userType:any = localStorage.getItem('typeOfUser')

    if (this.checkSignUptype) {
      console.log('Gooooooo')
      localStorage.setItem('signupMode', 'true')
      let extraVariable = {
        group: '',
        market: '',
        location: '',
        size_of_team: '1',
        contact_number: '',
        category: '',
        password: '',
        topic: '',
        on_boarding: '1',
        user_type: userType.user_type,
        subscriber_type: userType.subscriber_type,
        first_name: getCpSignUpData.signUpData.first_name,
        last_name: getCpSignUpData.signUpData.last_name,
      }
      console.log(extraVariable.user_type, '237....')
      console.log(extraVariable.subscriber_type, '238....')
      this.signUpData = { ...this.signUpData, ...extraVariable, ...this.registerForm.value }
      this.signUpData['profile'] = this.profilepic
      this.signUpData['social_id'] = this.tokenId
      this.signUpData['provider'] = this.provider

      localStorage.setItem("inSignuprequest", JSON.stringify(this.signUpData))


      this._service.getSignUpData(this.signUpData).subscribe(res => {
        let response = res
        localStorage.setItem('Signupresponse', JSON.stringify(response))
        localStorage.setItem('token', response.data.tokens)
        if (response.success) {
          window.location.href = "/lms/app/cp-dash";
         // this.profileData()
        }
        else {
          localStorage.setItem("Signup", 'User exist')
          console.log("Exist User", response.success);
          this.router.navigateByUrl('/lms/app/home')
          localStorage.setItem("userType", 'true');
         // window.location.href = "/lms/app/home";
          //this.profileData()
        }
      })
    }
    else {


      let data:any =localStorage.getItem('cpSignUp')
      let getCpSignUpData =JSON.parse(data)
      this.profileImg = localStorage.getItem('profileImg')
      this.submitted = true;
        let user :any = localStorage.getItem('typeOfUser');
        this.userType = JSON.parse(user)
        console.log(this.userType.user_type)
        this._getDataService.dataService.subscribe(res => {
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
          user_type: this.userType.user_type,
          subscriber_type: this.userType.subscriber_type
        }
        localStorage.setItem('firstName', request.first_name)
        localStorage.setItem('lastName', request.last_name)
        this._service.getSignUpEmail(request).subscribe(res => {
          let response = res
          if(res.success === true){
          localStorage.setItem('token', response.data.tokens)
          this.router.navigateByUrl('/lms/app/cp-dash')
          }
        })

    }

  }


  //  -----------------------------------------------
}
