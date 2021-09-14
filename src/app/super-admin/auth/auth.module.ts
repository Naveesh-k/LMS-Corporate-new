import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule} from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CheckboxModule, //primeng
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
