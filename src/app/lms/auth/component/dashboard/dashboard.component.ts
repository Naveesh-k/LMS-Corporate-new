import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public router :Router,
    private authService: SocialAuthService,
    public mode: ColorModeService, // dark-light
    public _service:GobalService, // api
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
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'78z3ppjpmhm04a'}&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=${'http://pifstage.swotfishdemo.com/lms/auth'}`
    var width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;
    window.location.href = oauthUrl;
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
        // this.router.navigateByUrl('/lms/auth/sign-up')
        setTimeout(() => {
          this.signOut();

        }, 1000);
        localStorage.setItem("userDetail", JSON.stringify(this.user));
      }

    });

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
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
    // this.signUpData1 = JSON.parse(getLocalStorage);
    if (signUpData && signUpData.photoUrl) {
      this.profilepic = signUpData.photoUrl;
      this.tokenId = signUpData.idToken
      this.provider = signUpData.provider
      console.log(this.provider)
    }
    // -----------------------------
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.signUp()
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // signInWithLinkedIn(): void {
  //   this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  // }
  signIn(provider: any){
  }
  signOut(): void {
    this.authService.signOut();
  }
  sendCodeOnLinkedIn = (code: any) => {
    let request = {
      // grant_type : "authorization_code",
      // client_id  : "78z3ppjpmhm04a",
      // client_secret : "zJibfAnzxsQlYw9d",
      // redirect_uri : "https://lms-new.netlify.app/lms/auth",
      code : code
    }
    this._service.getLinkedInLogin(request).subscribe(res => {
      let response = res;
      if(response.success == true){
        this.router.navigateByUrl('/lms/app/home')
      }else{
        this.router.navigateByUrl('/lms/auth/sign-up')
      }
    })

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
    this._service.getSignUpData(request).subscribe(res => {
      let response = res;
      // ------------------- Spinner
      // this.spinner.show();
      // setTimeout(() => {
      //   this.spinner.hide();
      // }, 1000);
      // ------------------- Spinner end
      if(response.success == true){
        this.router.navigateByUrl('/lms/auth/sign-up')
      }else{
        this.socailLogin(data)
        // this.router.navigateByUrl('/lms/auth/login')
        this.router.navigateByUrl('/lms/app/home')
      }
      console.log(response)
    })
  }

  socailLogin(data: any){
    console.log(data)
    let request:any = {
      email:          data.email,
      // social_id:      data.id_Token
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
  }

}
