import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  contactForm: any = FormGroup;
  submitted = false;
  hide: boolean = false;
  show: boolean = false;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({

      service: ['', Validators.required],
      number: ['', Validators.required]
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });

  }

// convenience getter for easy access to form fields
get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));
}

// hide show
showHide(){
  this.hide = true;
}
// end hide show

}
