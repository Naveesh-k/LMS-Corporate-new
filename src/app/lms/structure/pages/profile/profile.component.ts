import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;
  darkMode: boolean = false;
  hide: boolean = false;
  profileRecord:any;
  profileName:any;
  email:any;
  marketing:any;
  profile:any;
  company:any;
  social:any;
  signupFullName:any;
  companyName:any;
  profileImage:any;
  profileEmail:any;
  profileCompany:any;
  constructor(
    private spinner: NgxSpinnerService,
    public _service: GobalService,
    private formBuilder: FormBuilder,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        profile: ['', [Validators.required]],
        language: ['', [Validators.required]],
        country: ['', [Validators.required]],
        aboutMe: ['', [Validators.required]]
      },

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


    // get User name form local storage
    this.social = localStorage.getItem('signupMode')
      if (this.social === 'true') {
        let getLocalStorage: any = localStorage.getItem('userDetail');
        let signUpData = JSON.parse(getLocalStorage);
        this.signupFullName = signUpData.firstName + " " + signUpData.lastName
        this.profileImage = signUpData.photoUrl;
        this.profileEmail =signUpData.email
        this.profileCompany =signUpData.provider
        this.companyName = signUpData.companyName
        console.log('profile 74',signUpData)
        console.log('name :'+this.signupFullName, this.profileImage, this.profileEmail, this.profileCompany, this.companyName, '75 profile')
      } else {
        let normalUserFName = localStorage.getItem('firstName')
        let normalUserLName = localStorage.getItem('lastName')
        this.profileImage = localStorage.getItem('profile');
        this.signupFullName = normalUserFName + ' ' + normalUserLName
        // profile
      }


      this.profileData()

  }

  showHide() {
    this.hide = true;
  }
  hideShow() {
    this.hide = false;
  }
  arrowHide(){
    this.hide = false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }

  // dark-light
  dark(e: any) {
    console.log(e);
    if (e) {
      this.mode.changeMode('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      this.mode.changeMode('light');
      localStorage.setItem('mode', 'light');
    }
  }
  //end dark-light

  profileData() {
    // this.spinner.show();
    this._service.profileDataShow().subscribe(res => {

        let profileObj:any = {}
        this.profileRecord = res.data
        this.profileRecord.forEach((el:any)=>{
          profileObj = el
        })
        // this.spinner.hide();
        console.log(profileObj, 'sasdasdasdasd')

        // this.profileName = profileObj.first_name+' '+profileObj.last_name;
        // this.email = profileObj.email
        // this.marketing = profileObj.industry
        // this.profile = profileObj.profile
        // this.company = profileObj.companyName
        // this.loginForm.patchValue({
        //   name: this.profileName,
        //   email: profileObj.email,
        //   mobile: '',
        //   profile: profileObj.profile,
        //   language: 'English',
        //   country: 'UK',
        //   aboutMe: 'It is a long established fact that a reader.',
        // })

        // this.profileName = this.signupFullName;
        // this.email = this.profileEmail
        // this.marketing = this.profileCompany
        // this.profile = this.profileImage
        // this.company = this.profileCompany
        // this.loginForm.patchValue({
        //   name: this.profileName,
        //   email: this.email,
        //   mobile: '',
        //   profile: this.profile,
        //   language: 'English',
        //   country: 'UK',
        //   aboutMe: 'It is a long established fact that a reader.',
        // })

        if(this.social != 'true'){
          this.profileName = profileObj.first_name+' '+profileObj.last_name;
          this.email = profileObj.email
          this.marketing = profileObj.industry
          this.profile = profileObj.profile
          this.company = profileObj.company
          console.log(this.profileName, 'normal 178')
          this.loginForm.patchValue({
            name: this.profileName,
            email: profileObj.email,
            mobile: '',
            profile: profileObj.profile,
            language: 'English',
            country: 'UK',
            aboutMe: 'It is a long established fact that a reader.',
          })
        } else if(this.social === 'true'){
          this.profileName = this.signupFullName;
          this.email = this.profileEmail
          this.marketing = this.profileCompany
          this.profile = this.profileImage
          this.company = this.profileCompany
          console.log(this.profileName , 'socail 185')
          this.loginForm.patchValue({
            name: this.profileName,
            email: this.email,
            mobile: '',
            profile: this.profile,
            language: 'English',
            country: 'UK',
            aboutMe: 'It is a long established fact that a reader.',
          })
        }


      })
   }
}
