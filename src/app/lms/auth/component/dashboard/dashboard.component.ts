import { Component, OnInit, Input } from '@angular/core';
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
    this._service.checkSignupType()
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'78fuo9t76f397o'}&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=${'https://pifstage.swotfishdemo.com/lms/auth'}`
    var width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;
    window.location.href = oauthUrl;
};
  ngOnInit(): void {

    // ---------------------------------------
    let secData =  [
      "{\"firstName\":{\"localized\":{\"en_US\":\"Shubham\"},\"preferredLocale\":{\"country\":\"US\",\"language\":\"en\"}},\"lastName\":{\"localized\":{\"en_US\":\"Verma\"},\"preferredLocale\":{\"country\":\"US\",\"language\":\"en\"}},\"profilePicture\":{\"displayImage\":\"urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w\",\"displayImage~\":{\"paging\":{\"count\":10,\"start\":0,\"links\":[]},\"elements\":[{\"artifact\":\"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100)\",\"authorizationMethod\":\"PUBLIC\",\"data\":{\"com.linkedin.digitalmedia.mediaartifact.StillImage\":{\"mediaType\":\"image/jpeg\",\"rawCodecSpec\":{\"name\":\"jpeg\",\"type\":\"image\"},\"displaySize\":{\"width\":100.0,\"uom\":\"PX\",\"height\":100.0},\"storageSize\":{\"width\":100,\"height\":100},\"storageAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"},\"displayAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"}}},\"identifiers\":[{\"identifier\":\"https://media-exp1.licdn.com/dms/image/C5103AQErAVWCnRho3w/profile-displayphoto-shrink_100_100/0/1538285643620?e=1635379200&v=beta&t=NLTyfAApbPRXfi6F48Ps7NlDBEioV-tybwMZCDo82HE\",\"index\":0,\"mediaType\":\"image/jpeg\",\"file\":\"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100,0)\",\"identifierType\":\"EXTERNAL_URL\",\"identifierExpiresInSeconds\":1635379200}]},{\"artifact\":\"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200)\",\"authorizationMethod\":\"PUBLIC\",\"data\":{\"com.linkedin.digitalmedia.mediaartifact.StillImage\":{\"mediaType\":\"image/jpeg\",\"rawCodecSpec\":{\"name\":\"jpeg\",\"type\":\"image\"},\"displaySize\":{\"width\":200.0,\"uom\":\"PX\",\"height\":200.0},\"storageSize\":{\"width\":200,\"height\":200},\"storageAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"},\"displayAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"}}},\"identifiers\":[{\"identifier\":\"https://media-exp1.licdn.com/dms/image/C5103AQErAVWCnRho3w/profile-displayphoto-shrink_200_200/0/1538285643620?e=1635379200&v=beta&t=tKuukkyOBGEil-sRPEdKdBsOpHuaGRWzVGuYjAl7fv4\",\"index\":0,\"mediaType\":\"image/jpeg\",\"file\":\"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200,0)\",\"identifierType\":\"EXTERNAL_URL\",\"identifierExpiresInSeconds\":1635379200}]},{\"artifact\":\"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400)\",\"authorizationMethod\":\"PUBLIC\",\"data\":{\"com.linkedin.digitalmedia.mediaartifact.StillImage\":{\"mediaType\":\"image/jpeg\",\"rawCodecSpec\":{\"name\":\"jpeg\",\"type\":\"image\"},\"displaySize\":{\"width\":400.0,\"uom\":\"PX\",\"height\":400.0},\"storageSize\":{\"width\":400,\"height\":400},\"storageAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"},\"displayAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"}}},\"identifiers\":[{\"identifier\":\"https://media-exp1.licdn.com/dms/image/C5103AQErAVWCnRho3w/profile-displayphoto-shrink_400_400/0/1538285643620?e=1635379200&v=beta&t=vbYq-Fr_BBTHxQop6-kdQJ0MsvGL_mJoTG6GXXFmof0\",\"index\":0,\"mediaType\":\"image/jpeg\",\"file\":\"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400,0)\",\"identifierType\":\"EXTERNAL_URL\",\"identifierExpiresInSeconds\":1635379200}]},{\"artifact\":\"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800)\",\"authorizationMethod\":\"PUBLIC\",\"data\":{\"com.linkedin.digitalmedia.mediaartifact.StillImage\":{\"mediaType\":\"image/jpeg\",\"rawCodecSpec\":{\"name\":\"jpeg\",\"type\":\"image\"},\"displaySize\":{\"width\":800.0,\"uom\":\"PX\",\"height\":800.0},\"storageSize\":{\"width\":800,\"height\":800},\"storageAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"},\"displayAspectRatio\":{\"widthAspect\":1.0,\"heightAspect\":1.0,\"formatted\":\"1.00:1.00\"}}},\"identifiers\":[{\"identifier\":\"https://media-exp1.licdn.com/dms/image/C5103AQErAVWCnRho3w/profile-displayphoto-shrink_800_800/0/1538285643620?e=1635379200&v=beta&t=0IRiPLVnw_jCeis3iNDY62CdN-vXENPnKtrOhJcMw6I\",\"index\":0,\"mediaType\":\"image/jpeg\",\"file\":\"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQErAVWCnRho3w,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800,0)\",\"identifierType\":\"EXTERNAL_URL\",\"identifierExpiresInSeconds\":1635379200}]}]}},\"id\":\"OMiGj_W7xP\"}",
      "{\"elements\":[{\"handle~\":{\"emailaddress\":\"shubhamverma377@gmail.com\"},\"handle\":\"urn:li:emailAddress:3976598607\"}]}"
  ]
    // console.log(JSON.parse(data[]))
    if (secData) {
      let userFirstName = '';
      let userLastName = '';
      let linkedInEmail = '';
      let userProfile = '';
      let userId = '';

      let data1   = JSON.parse(secData[0]);
      if (data1) {
        console.log(data1)
        userFirstName = data1.firstName.localized.en_US;
        userLastName = data1.lastName.localized.en_US;
        userId = data1.id;
        userProfile = data1.profilePicture['displayImage~'].elements[1].identifiers[0].identifier;
      }
      let data2 = JSON.parse(secData[1]);
      if (data2 && data2.elements) {
        linkedInEmail = data2.elements[0]['handle~'].emailaddress
      }
      console.log(linkedInEmail);
      console.log(userFirstName);
      console.log(userLastName);
      console.log(userProfile);
      console.log(userId);
    }
    // let userSecData = JSON.parse(data[0]);

    // ---------------------------------------
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
    // this.signUp()
  }

  signInWithFB(): void {
   this._service.checkSignupType()
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
        client_id  : "78fuo9t76f397o",
        client_secret : "3TpJtdjTxBrZ5GAp",
        redirect_uri : "http://pifstage.swotfishdemo.com/lms/auth",
        code : code
    }
    console.log(request,'check 142')
    this._service.getLinkedInLogin(request).subscribe(res => {
      let response = res;
      console.log(response,'check 145')
      if(response.success == true){
        let secData = response.data;
        if (secData) {
          let userFirstName = '';
          let userLastName = '';
          let linkedInEmail = '';
          let userProfile = '';
          let userId = '';

          let data1   = JSON.parse(secData[0]);
          if (data1) {
            console.log(data1)
            userFirstName = data1.firstName.localized.en_US;
            userLastName = data1.lastName.localized.en_US;
            userId = data1.id;
            userProfile = data1.profilePicture['displayImage~'].elements[1].identifiers[0].identifier;
          }
          let data2 = JSON.parse(secData[1]);
          if (data2 && data2.elements) {
            linkedInEmail = data2.elements[0]['handle~'].emailaddress
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

  nonSocialSignup(link:any){
     this.router.navigateByUrl(link);
     localStorage.setItem('signupType' , 'false')
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
     } else if(data.provider === 'LINKEDIN') {
        request['social_id'] =  data.userId;
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

  // linkedLogin(data: any){
  //   console.log(data)
  //   let request:any = {
  //     grant_type: data.grant_type,
  //     code: data.code,
  //     client_id: data.client_id,
  //     client_secret: data.client_secret,
  //     redirect_uri: data.redirect_uri
  //   }
  //   console.log(request)
  //   if(data.provider === 'LINKEDIN'){
  //     request['social_id'] =  data.code;
  //   }
  //   console.log(request)
  //   this._service.getLinkedInLogin(request).subscribe(res => {
  //     let response = res;
  //     console.log(response)
  //   })
  // }

}
