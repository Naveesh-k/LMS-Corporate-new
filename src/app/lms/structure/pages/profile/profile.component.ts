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
  updateProfileForm: any = FormGroup;
  submitted = false;
  darkMode: boolean = false;
  hide: boolean = false;
  profileRecord:any;
  profileName:any;
  profileFName:any;
  profileLName:any;
  email:any;
  marketing:any;
  profile:any;
  company:any;
  social:any;
  signupFullName:any;
  companyName:any;
  profileImage:any;
  profileEmail:any;
  contactNumber :any;
  aboutMe :any;
  country:any;
  language:any;
  profileCompany:any;
  imagePath:any;
  imageFile:any;
  uploadedImage:any;
  constructor(
    private spinner: NgxSpinnerService,
    public _service: GobalService,
    private formBuilder: FormBuilder,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    console.log("Test ngOninit 37")
    this.profileData()
    console.log("Test ngOninit 39")
    this.updateProfileForm = this.formBuilder.group(
      {
        // name: ['', [Validators.required]],
        fname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
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
        this.companyName = signUpData.provider
        console.log('profile 74',signUpData)
        console.log(this.signupFullName, this.profileImage, this.profileEmail, this.profileCompany, this.companyName, '75 profile')
        this.profileData()
      }
      // else {
      //   let normalUserFName = localStorage.getItem('firstName')
      //   let normalUserLName = localStorage.getItem('lastName')
      //   this.profileImage = localStorage.getItem('profile');
      //   this.signupFullName = normalUserFName + ' ' + normalUserLName
      // }


      // this.profileData()

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
    return this.updateProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateProfileForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateProfileForm.value, null, 4));
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


  updateProfile(){

    console.log(this.updateProfileForm.value)

    let request = {
      // name          : this.updateProfileForm.value.name,
      contact_number  : this.updateProfileForm.value.mobile,
      email         : this.updateProfileForm.value.email,
      language      : this.updateProfileForm.value.language,
      country       : this.updateProfileForm.value.country,
      about_me       : this.updateProfileForm.value.aboutMe,
      first_name       : this.updateProfileForm.value.fname,
      last_name       : this.updateProfileForm.value.lname,
      profile       : this.uploadedImage.location,
    }

    console.log("Request passed")

    this._service.profileUpdate(request).subscribe(res => {
        let response = res;
        console.log('134 update profile',response)
        this.profileData();
        this.hide = false;
    })
  }

  imageUplaoad(event:any){
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    var formData = new FormData();
    formData.append('image', event.target.files[0]);

    if (
      event.target.files[0] &&
      allowedMimeTypes.includes(event.target.files[0].type)
    ){
      this.imagePath = event.target.files;
      this.imageFile = this.imagePath[0];
  }

   console.log(formData)
    this._service.uploadImage(formData).subscribe(res => {
     this.uploadedImage = res.image
      localStorage.setItem('profileImg',this.uploadedImage.location)
    })
  }

  profileData() {
    console.log('profile data api 131')
    // this.spinner.show();
    this._service.profileDataShow().subscribe(res => {

        let profileObj:any = {}
        this.profileRecord = res.data
        this.profileRecord.forEach((el:any)=>{
          profileObj = el
        })
        // this.spinner.hide()
        console.log(profileObj, 'social sign up 168')
        if(this.social != 'true'){
          // this.profileName = profileObj.first_name+' '+profileObj.last_name;
          this.profileFName = profileObj.first_name;
          this.profileLName = profileObj.last_name;
          this.email = profileObj.email;
          this.marketing = profileObj.industry;
          this.profile = profileObj.profile;
          this.company = profileObj.company;
          this.contactNumber = profileObj.contact_number;
          this.aboutMe = profileObj.about_me;
          this.country = profileObj.country;
          this.language = profileObj.language;
          this.updateProfileForm.patchValue({
            name: this.profileName,
            email: profileObj.email,
            mobile: this.contactNumber,
            profile: profileObj.profile,
            country: this.country,
            aboutMe: this.aboutMe,
            fname: this.profileFName,
            lname: this.profileLName,
            language: this.language,

          })
        } else {
          console.log('run','186')
          this.profileName = this.signupFullName;
          this.email = this.profileEmail;
          this.marketing = this.profileCompany;
          this.profile = this.profileImage;
          this.company = this.profileCompany;
          console.log(this.profileName , 'socail 185')
          this.updateProfileForm.patchValue({
            name: this.profileName,
            email: this.email,
            mobile: '',
            profile: this.profile,
            language: 'English',
            country: 'UK',
            aboutMe: 'It is a long established fact that a reader.',
          })
          console.log(this.updateProfileForm.value, '201 login form')
        }


      })
   }
}
