import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { CustomiseTopicComponent } from './component/customise-topic/customise-topic.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { UserGroupComponent } from './component/user-group/user-group.component';
import { CpSignUpComponent } from './component/cp-sign-up/cp-sign-up.component';
// import { AuthguardServiceService } from './auth-guard/authguard-service.service';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomiseTopicComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    UserGroupComponent,
    CpSignUpComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SocialLoginModule,HttpClientModule  ],
  providers: [{
    // Auth guard
    // AuthguardServiceService ,
    // end Auth guard
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '533347858403-clm6imc210v9hrtdrt68ps7cssp6p82l.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('363462991980235')
        }
      ]
    } as SocialAuthServiceConfig

  },
  GobalService

],

})
export class AuthModule {}
