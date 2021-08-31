import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cp-dashboard',
  templateUrl: './cp-dashboard.component.html',
  styleUrls: ['./cp-dashboard.component.scss']
})
export class CpDashboardComponent implements OnInit {
  darkMode: boolean = false; // dark-light
  registerForm: any = FormGroup;
  submitted: boolean = false;
  topics: any = [{
    'name': 'Course',
    'para': 'With a course, you can build a curriculum for your students that can be self-paced or guided directly by you, the instructor.',
    'image': `${environment.assetPath}/images/plant frame.png`,
    'active':false,
  },
  {
    'name': 'Coaching',
    'para': 'With coaching, you can collaborate with your students more, helping them reach milestones through scheduled video calls.',
    // 'image': '../../../../../assets/images/computer frame.png',
    'image': `${environment.assetPath}/images/computer frame.png`,
    'active':false,
  }];
  customizeTopic : any = [];
  constructor(public mode: ColorModeService, private formBuilder: FormBuilder ) { }

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
      title: ['', Validators.required],
      courseSubtitle: ['', Validators.required],
      selectAuthor: ['', Validators.required],
  });
  }

// Single select
  selectedTopics(item:any){
    this.topics.forEach((element:any)=>{
       if(item.name === element.name){
        element.active = true;
        let index = this.customizeTopic.indexOf(element.name)
        element.active ?
          this.customizeTopic.push(element.name):
          this.customizeTopic.splice(index, 1)
       }
       else {
        element.active = false;
       }
    })
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}
}
