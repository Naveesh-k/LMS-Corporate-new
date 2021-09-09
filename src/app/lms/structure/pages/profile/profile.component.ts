import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;
  darkMode: boolean = false;
  hide: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        // validator: MustMatch('password', 'confirmPassword')
      }
    );

    // dark-light
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light
  }

  showHide() {
    this.hide = true;
  }
  hideShow() {
    this.hide = false;
  }
  arrowHide(){
    this.hide = false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }

  // dark-light
  dark(e: any) {
    console.log(e);
    if (e) {
      this.mode.changeMode('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      this.mode.changeMode('light');
      localStorage.setItem('mode', 'light');
    }
  }
  //end dark-light
}
