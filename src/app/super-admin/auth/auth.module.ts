import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule} from 'primeng/checkbox';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CheckboxModule, //primeng
  ]
})
export class AuthModule { }
