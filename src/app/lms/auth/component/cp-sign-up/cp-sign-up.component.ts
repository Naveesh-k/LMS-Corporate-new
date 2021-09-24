import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cp-sign-up',
  templateUrl: './cp-sign-up.component.html',
  styleUrls: ['./cp-sign-up.component.scss']
})
export class CpSignUpComponent implements OnInit {
  darkMode: boolean = false;
  registerForm: any = FormGroup;
  submitted = false;
  hide: boolean = false;
  constructor(
    public router: Router,
    public mode: ColorModeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // dark-light
    this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light

    this.registerForm = this.formBuilder.group({
      provider: ['', Validators.required],
      market: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      team: ['', Validators.required],
      contactNumber: ['', Validators.required],
  });
  }

  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // if (this.registerForm.invalid) {
        //     return;
        // }
        console.log()
        this.router.navigateByUrl('/lms/app/cp-dash')
    }

    nextPage(){
      this.hide = !false;
    }
}
