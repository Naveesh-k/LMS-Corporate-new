import { Component, OnInit, Input } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr'; // Toaster
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  darkMode: boolean = false;
  user: SocialUser = {
    id: '',
    provider: '',
    email: '',
    name: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
    response: ''
  };
  loggedIn: boolean = false;
  sub: any;
  signUpData:any = {};
  profilepic:any = ''
  tokenId:any = ''
  provider:any = ''
  socialloginData:any = ''

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public router :Router,
    private authService: SocialAuthService,
    public mode: ColorModeService,
    public _service:GobalService,
  ) {}
  // public subscribeToisInitialized(){
  //     this._linkedInService.isInitialized$.subscribe({
  //     next: (state) => {
  //       // state will always return true when API finishes loading
  //     },
  //     complete: () => {
  //       // Completed
  //     }
  //   });
  // }

  subscribeToLogin(){
    this._service.checkSignupType()
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'78fuo9t76f397o'}&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=${'https://pifstage.swotfishdemo.com/lms/auth'}`
    var width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;
    window.location.href = oauthUrl;
    // const options = `directories=no, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no,
    // copyhistory=no, width=${width},height=${height},left=${left},top=${top}`;
    // window.open(oauthUrl, '_blank', options);
};
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
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      if(this.user){
        this.signUp(this.user)
        setTimeout(() => {
          this.signOut();
        }, 1000);
        localStorage.setItem("userDetail", JSON.stringify(this.user));
      }

    });

    this.route.queryParams
      .subscribe(params => {
        let code = params.code;
        console.log(code)
        if (code) {
          this.sendCodeOnLinkedIn(code);
        }
      }
    );
    // -----------------------------
    let getLocalStorage:any =  localStorage.getItem('userDetail');
    let signUpData:any = JSON.parse(getLocalStorage);
    if (signUpData && signUpData.photoUrl) {
      this.profilepic = signUpData.photoUrl;
      this.tokenId = signUpData.idToken
      this.provider = signUpData.provider
      console.log(this.provider)
    }
    // -----------------------------

  }
  signInWithGoogle(): void {
   this._service.checkSignupType()
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
   this._service.checkSignupType()
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signIn(provider: any){
  }
  signOut(): void {
    this.authService.signOut();
  }
  sendCodeOnLinkedIn = (code: any) => {
    let request = {
        grant_type : "authorization_code",
        client_id  : "78fuo9t76f397o",
        client_secret : "3TpJtdjTxBrZ5GAp",
        redirect_uri : "http://pifstage.swotfishdemo.com/lms/auth",
        code : code
    }
    // window.open('https://javascript.info/')
    this._service.getLinkedInLogin(request).subscribe(res => {
      let response = res;
      console.log(response,'check 145')
      if(response.success === true){
        let secData = response.data;
        if (secData) {
          let userFirstName = '';
          let userLastName = '';
          let linkedInEmail = '';
          let userProfile = '';
          let userId = '';

          let data1   = JSON.parse(secData[0]);
          console.log('check1',data1)
          if (data1) {
            userFirstName = data1.firstName.localized.en_US;
            userLastName = data1.lastName.localized.en_US;
            userId = data1.id;
            userProfile = data1.profilePicture && data1.profilePicture['displayImage~'].elements[1].identifiers[0].identifier;
          }
          let data2 = JSON.parse(secData[1]);
          if (data2 && data2.elements) {
            linkedInEmail = data2.elements[0]['handle~'].emailAddress
          }
          let req = {
            photoUrl: userProfile !== undefined ? '' : userProfile,
            provider: 'LINKEDIN',
            email: linkedInEmail,
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
          }
          localStorage.setItem("userDetail", JSON.stringify(req));
          this.signUp(req);
          // this.router.navigateByUrl('/lms/auth/sign-up')
        }

      } else {
        // this.router.navigateByUrl('/lms/auth/sign-up')
      }
    })

  }

  nonSocialSignup(link:any){
     this.router.navigateByUrl(link);
     localStorage.setItem('signupType' , 'false')
  }

  signUp(data: any) {
    // this.spinner.show();
    this.socialloginData = data
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
        console.log("Dashboard 215" , data.email);
        // (data.email === undefined) ?
        //   this.router.navigateByUrl('/lms/auth/sign-up'):
        //   this.router.navigateByUrl('lms/app/home')
        if(data.email === undefined){
          this.fbLogin(data)
          // this.router.navigateByUrl('/lms/auth/sign-up')
        }else if(data.email != undefined){
          this.router.navigateByUrl('/lms/app/home')
        }
        request['social_id'] =  data.authToken;
        console.log("fb auth",data.authToken)
     } else if(data.provider === 'LINKEDIN') {
        request['social_id'] =  data.userId;
     }

     this._service.getSignUpData(request).subscribe(res => {

      let response = res;

      if(response.success == true){
        // this.spinner.hide();
        this.router.navigateByUrl('/lms/auth/user-group')
      }else{
        this.router.navigateByUrl('/lms/app/home')
        this.socailLogin(this.socialloginData)
      }
      console.log(response)
    })
  }


    fbLogin(data: any){
      console.log(data)
      let request:any = {
        social_id:  data.id,
      }
      console.log('fb login',request)
      this._service.postFacebookLogin(request).subscribe(res => {
        let response = res;
        console.log(response, response.email)
        if(response.email === ""){
          console.log("===",'260 fbLogin')
          this.router.navigateByUrl('/lms/auth/sign-up')
        } else if(response.email != ""){
          console.log("!=",'262 fbLogin')
          this.router.navigateByUrl('/lms/app/home')
        }
      })
    }

  socailLogin(data: any){
    console.log(data)
    let request:any = {
      email:          data.email,
    }
    if(data.provider === 'GOOGLE'){
      request['social_id'] =  data.idToken;
    } else if (data.provider === 'FACEBOOK'){
       request['social_id'] =  data.authToken;
    }
    console.log(request)
    this._service.getSocialLogin(request).subscribe(res => {
      let response = res;
      console.log(response)
    })
    this.router.navigateByUrl('/lms/app/home')
  }


}
