import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm: any = FormGroup;
  registrationFormSec: any = FormGroup;
  registrationFormThird: any = FormGroup;
  showS:boolean = false;
  showF:boolean = false;
  showT:boolean = true;
  submitted = false;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });
    this.registrationFormSec = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });
    this.registrationFormThird = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });
  }

// ---------Showhide section--------
fShow(){
  this.showT = false;
  this.showS = false;
  this.showF = true;
}
sShow(){
  this.showT = false;
  this.showS = true;
  this.showF = false;
}
tShow(){
  this.showT = true;
  this.showS = false;
  this.showF = false;
}
// --------Showhide section---------

// convenience getter for easy access to form fields
get f() { return this.registrationForm.controls; }
get f1() { return this.registrationFormSec.controls; }
get f2() { return this.registrationFormThird.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value, null, 4));
}
onSubmitSec() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationFormSec.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationFormSec.value, null, 4));
}
onSubmitThir() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationFormThird.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationFormThird.value, null, 4));
}


}
