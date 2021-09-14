import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminApiServiceService } from 'src/app/super-admin/super-admin-service/super-admin-api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: any = FormGroup;
    submitted = false;
  constructor(private formBuilder: FormBuilder, public _services:SuperAdminApiServiceService, private toastr: ToastrService,public router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      // this.submitted = true;

      // stop here if form is invalid
      // if (this.loginForm.invalid) {
      //     return;
      // }
      let request = {
        email: this.loginForm.value.email,
        password : this.loginForm.value.password,
  }
  // this.spinner.show();
  this._services.getAdminLogin(request).subscribe(res => {
    let response = res;
    console.log(response)
    let token = response.data.tokens
    localStorage.setItem("token", token);

  })

  }



}
