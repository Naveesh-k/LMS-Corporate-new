import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm: any = FormGroup;
  registerFormSec: any = FormGroup;
  submitted = false;
  submittedSec = false;
  darkMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public mode: ColorModeService // dark-light
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue],
    });
    this.registerFormSec = this.formBuilder.group({
      title: ['', Validators.required],
      position: ['', Validators.required],
      jobTitle: ['', Validators.required],
      experience: ['', [Validators.required, Validators.email]],
      profile: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue],
    });

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

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  get f1() {
    return this.registerFormSec.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onNext() {
    this.submittedSec = true;
    if (this.registerFormSec.invalid) {
      return;
    }
    // display form values on success
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerFormSec.value, null, 4)
    );
  }
}
