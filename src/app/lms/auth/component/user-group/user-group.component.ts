import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  darkMode: boolean = false;
  topics: any = [{
    'name': 'Free user',
    'active':false,
  },
  {
    'name': 'Subscriber',
    'active':false,
  },
  {
    'name': 'Courses Provider',
    'active':false,
  }
];
customizeTopic : any = [];
  constructor(
    public router :Router,
    public mode: ColorModeService // dark-light
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

  }

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
  // ------------------------------------------------------------
  getSignUp(){
   let getSocialLogin = localStorage.getItem("socailSignUp");
   this.router.navigateByUrl('/lms/auth/sign-up')
   console.log(getSocialLogin)
  }
  // ------------------------------------------------------------
  selectOne(item: any){
    this.topics.forEach((element:any)=>{
      if(item.name !== element.name){
       element.active = false;
      //  let index = this.customizeTopic.indexOf(element.name)
      //  element.active ?
      //    this.customizeTopic.push(element.name):
      //    this.customizeTopic.splice(index, 1)
      }
   })
   item.active = true;
    // let first = document.getElementsByClassName('btn_free_user')
    // if(first == ){

    // }
  }

}
