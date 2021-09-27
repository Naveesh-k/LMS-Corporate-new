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
  signUpData: any = {};
  profilepic: any = ''
  tokenId: any = ''
  provider: any = ''
  socialloginData: any = ''

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public router: Router,
    private authService: SocialAuthService,
    public mode: ColorModeService,
    public _service: GobalService,
  ) { }
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

  subscribeToLogin() {

    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'78fuo9t76f397o'}&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=${'https://pifstage.swotfishdemo.com/lms/auth'}`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.location.href = oauthUrl;
    this._service.checkSignupType()
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
      if (this.user) {
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
    let getLocalStorage: any = localStorage.getItem('userDetail');
    let signUpData: any = JSON.parse(getLocalStorage);
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
    this._service.checkSignupType()
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this._service.checkSignupType()
  }

  signIn(provider: any) {
  }
  signOut(): void {
    this.authService.signOut();
  }
  sendCodeOnLinkedIn = (code: any) => {
    let request = {
      grant_type: "authorization_code",
      client_id: "78fuo9t76f397o",
      client_secret: "3TpJtdjTxBrZ5GAp",
      redirect_uri: "http://pifstage.swotfishdemo.com/lms/auth",
      code: code
    }
    // window.open('https://javascript.info/')
    this._service.getLinkedInLogin(request).subscribe(res => {
      let response = res;
      console.log(response, 'check 145 dashboard')
      if (response.success === true) {
        let secData = response.data;
        if (secData) {
          let userFirstName = '';
          let userLastName = '';
          let linkedInEmail = '';
          let userProfile = '';
          let userId = '';

          let data1 = JSON.parse(secData[0]);
          if (data1) {
            userFirstName = data1.firstName.localized.en_US;
            userLastName = data1.lastName.localized.en_US;
            userId = data1.id;
            userProfile = data1.profilePicture && data1.profilePicture['displayImage~'].elements[1].identifiers[0].identifier;
          }
          console.log(userProfile, "159 linked in")
          let data2 = JSON.parse(secData[1]);
          if (data2 && data2.elements) {
            linkedInEmail = data2.elements[0]['handle~'].emailAddress
          }
          let req = {
            photoUrl: userProfile,
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

  nonSocialSignup(link: any) {
    this.router.navigateByUrl(link);
    localStorage.setItem('signupType', 'false')
  }

  signUp(data: any) {

    console.log("Signup hit at 191 sign-up")
    // this.spinner.show();
    this.socialloginData = data
    let request: any = {
      profile: data.photoUrl,
      provider: data.provider,
      email: data.email,
      size_of_team: 0,
      on_boarding: 0,
      experience: 0,
      first_name: "",
      id: data.id,
      last_name: "",
      password: "",
      group_val: "",
      market: "",
      location: "",
      contact_number: "",
      category: "",
      topic: "",
      industry: "",
      position: "",
      job_title: "",
      customize_topic: []
    }
    if (data.provider === 'GOOGLE') {
      request['social_id'] = data.idToken;
    } else if (data.provider === 'FACEBOOK') {
      if (data.email === undefined) {
        request['social_id'] = data.id
        if (data.id !== '') {
          this.fbLogin(data)
        } 
      }
      else {
        request['social_id'] = data.id;
      }
    } else if (data.provider === 'LINKEDIN') {
      request['social_id'] = data.userId;
    }

    this._service.getSignUpData(request).subscribe(res => {

      let response = res;
      console.log('Dashboard 231', response)
      localStorage.setItem('signupMode', 'true')
      if (response.success == true) {
        // this.router.navigateByUrl('/lms/auth/user-group')
        window.location.href = "/lms/auth/user-group";
      } else {
        let request: any = {
          email: data.email,
        }
        if (data.provider === 'GOOGLE') {
          request['social_id'] = response.data.social_id;
        } else if (data.provider === 'FACEBOOK') {
          //request['social_id'] = data.authToken;
          if (data.email === '') {
            this.fbLogin(data)
          }
          request['social_id'] = response.data.social_id;
        }
        else if (data.provider === 'LINKEDIN') {
          //request['social_id'] = data.userId;
          request['social_id'] = response.data.social_id;
        }

        this._service.getSocialLogin(request).subscribe(res => {

          localStorage.setItem('socialtoken', JSON.stringify({ social: true, token: res.data.tokens }))
          window.location.href = "/lms/app/home";
        })
      }
    })
  }

  // if user are already exist

  fbLogin(data: any) {
    localStorage.setItem('fbmobile', JSON.stringify(data))
    let request: any = {
      social_id: data.id,
    }
    localStorage.setItem('fbrequest', JSON.stringify(request))

    this.spinner.show();
    this._service.postFacebookLogin(request).subscribe(res => {
      let response = res;

      localStorage.setItem('fbresponse', JSON.stringify(response))

      if (response.email === "") {
        this.spinner.hide();
        // this.router.navigateByUrl('/lms/auth/sign-up')
        window.location.href = "/lms/auth/sign-up";
      } else if (response.email != "") {
        // this.router.navigateByUrl('/lms/app/home')
        window.location.href = "/lms/app/home";
      }
    })
  }

}
