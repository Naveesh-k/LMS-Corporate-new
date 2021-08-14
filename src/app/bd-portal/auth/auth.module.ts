import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './component/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { CommonFooterComponent } from '../common-footer/common-footer.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, CommonFooterComponent],
  imports: [CommonModule,
     AuthRoutingModule,
      ReactiveFormsModule,
    FormsModule,

  ],
})
export class AuthModule {}
