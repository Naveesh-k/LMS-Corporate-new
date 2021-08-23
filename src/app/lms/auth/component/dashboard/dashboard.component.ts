import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
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
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'7826nk71a9dk21'}&scope=r_liteprofile&state=123456&redirect_uri=${'http://localhost:4200/lms/auth'}`
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
      }
      localStorage.setItem("userDetail", JSON.stringify(this.user));

      setTimeout(() => {
        this.signOut();

      }, 2000);
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
      grant_type : "authorization_code",
      client_id  : "7826nk71a9dk21",
      client_secret : "xwhhn3iECaD6yu1u",
      redirect_uri : "http://localhost:4200/lms/auth",
      code : code
    }
    //?grant_type=authorization_code&client_id=${request.client_id}&client_secret=${request.client_secret}&code=${request.code}&redirect_uri=${request.redirect_uri}`
    axios.post(`https://www.linkedin.com/oauth/v2/accessToken`, new URLSearchParams(request),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((response: any) => {
      console.log(response.data);
      if (response.data) {
        if (response.data.access_token) {
          // console.log()
          // getUserLinkedInInfo(response.access_token);
        }
      }

    })
    .catch((error: any) => {
      console.log(error);

    });
  }


  signUp(data: any) {
    console.log(data);
    // let extraVariable = {
    //   group:'',
    //   market:'',
    //   location:'',
    //   size_of_team:'',
    //   contact_number:'',
    //   category:'',
    //   password:'',
    //   topic:'',
    //   on_boarding:'1'
    // }
    let request = {
      profile: data.photoUrl,
      provider: data.provider,
      social_id: data.photoUrl,
      first_name: '',
      last_name : '',
      email: '',
      password: '',
      group_val: '',
      market: '',
      location: '',
      size_of_team: '0',
      contact_number: '',
      category: '',
      topic: '',
      on_boarding: '',
      industry  : '',
      position: '',
      job_title: '',
      experience: '',
      customize_topic : [],
    }
    // this.signUpData = {...this.signUpData,...this.registerFormSec.value, ...extraVariable}

    console.log(request)
    this._service.getSignUpData(request).subscribe(res => {
      let response = res;
      if(response.success == true){
        this.router.navigateByUrl('/lms/auth/sign-up')
      }else{
        this.router.navigateByUrl('/lms/auth/login')
      }
      console.log(response)
    })
  }

}
