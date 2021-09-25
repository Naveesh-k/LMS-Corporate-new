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
  profileRecord: any;
  profileName: any;
  profileFName: any;
  profileLName: any;
  email: any;
  marketing: any;
  profile: any;
  company: any;
  social: any;
  signupFullName: any;
  companyName: any;
  profileImage: any;
  profileEmail: any;
  contactNumber: any;
  aboutMe: any;
  country: any;
  language: any;
  profileCompany: any;
  imagePath: any;
  imageFile: any;
  uploadedImage: any;

  //Variabel using for get profile response
  profileResponse: any = {};

  constructor(
    private spinner: NgxSpinnerService,
    public _service: GobalService,
    private formBuilder: FormBuilder,
    public mode: ColorModeService // dark-light
  ) { }

  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group(
      {
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

    this.profileData();
  }


  profileData() {
    this.social = localStorage.getItem('signupMode')
    this.profileResponse = {}
    if (this.social === 'true') {
      this._service.profileDataShow().subscribe(res => {
        console.log("Social", res)
      })

      let getLocalStorage: any = localStorage.getItem('userDetail');

      let signUpData = JSON.parse(getLocalStorage);

      this.profileResponse["first_name"] = signUpData.firstName
      this.profileResponse["last_name"] = signUpData.lastName
      this.profileResponse["email"] = signUpData.email
      this.profileResponse["profile"] = signUpData.photoUrl
      this.profileResponse["contact_number"] = signUpData.contact_number ? signUpData.contact_number : '',
        this.profileResponse["language"] = signUpData.language ? signUpData.language : '',
        this.profileResponse["country"] = signUpData.country ? signUpData.country : '',
        this.profileResponse["about_me"] = signUpData.about_me ? signUpData.about_me : ''

      this.uploadedImage = this.profileResponse.profile
      this.patchUpdateValues();
    }

    else {
      this._service.profileDataShow().subscribe(res => {
        this.profileRecord = res.data
        this.profileRecord.forEach((el: any) => {
          this.profileResponse = el
        })

        this.uploadedImage = this.profileResponse.profile
        this.patchUpdateValues();
      })
    }
  }

  patchUpdateValues() {
    this.updateProfileForm.patchValue({
      fname: this.profileResponse.first_name,
      lname: this.profileResponse.last_name,
      email: this.profileResponse.email,
      mobile: this.profileResponse.contact_number,
      language: this.profileResponse.language,
      country: this.profileResponse.country,
      aboutMe: this.profileResponse.about_me
    })
  }

  showHide() {
    this.hide = true;
  }

  hideShow() {
    this.hide = false;
  }

  arrowHide() {
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
    if (e) {
      this.mode.changeMode('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      this.mode.changeMode('light');
      localStorage.setItem('mode', 'light');
    }
  }
  //end dark-light


  updateProfile() {
    let request = {
      contact_number: this.updateProfileForm.value.mobile,
      email: this.updateProfileForm.value.email,
      language: this.updateProfileForm.value.language,
      country: this.updateProfileForm.value.country,
      about_me: this.updateProfileForm.value.aboutMe,
      first_name: this.updateProfileForm.value.fname,
      last_name: this.updateProfileForm.value.lname,
      profile: this.uploadedImage
    }

    
    console.log("Profile 180" , request)

    this._service.profileUpdate(request).subscribe(res => {
      let response = res;
      console.log('134 update profile', response)
      this.profileData();
      this.hide = false;
    })
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

    this._service.uploadImage(formData).subscribe(res => {
      this.uploadedImage = res.image.location
      localStorage.setItem('profileImg', this.uploadedImage)
    })
  }
}
