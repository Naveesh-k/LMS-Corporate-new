import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  darkMode: boolean = false;
  imagePath: any;
  imageFile: any;
  uploadedImage: any;
  topics: any = [{
    name: 'Free user',
    active:false,
  },
  {
    name: 'Subscriber',
    active:false,
  },
  {
    name: 'Courses Provider',
    active:false,
  }
];
selectOptions:any = [
  {
    name: 'Free user',
    value: 1
  },
  {
    name: 'Subscriber',
    value: 2,
    children: [
      {
        name:'normal',
        value:1
      },
      {
        name:'enterprise',
        value:2
      }
    ]
  },
  {
    name: 'Courses Provider',
    value: 3
  }
]
linkName:any;
customizeTopic : any = [];
  constructor(
    public _service: GobalService,
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

  getSignUp(){
   let getSocialLogin = localStorage.getItem("socailSignUp");
   this.router.navigateByUrl('/lms/auth/sign-up')
   console.log(getSocialLogin)
  }

  selectOne(item: any, event: any){
    this.linkName = item.name
    console.log(event.target.value)
    console.log(item)
    let typeRecord = {
      user_type: 0,
      subscriber_type: 0
    }

    this.selectOptions.forEach((el:any)=>{
       if(item.name === el.name) {
         if(event.target.value === undefined){

            typeRecord.user_type = el.value,
            typeRecord.subscriber_type = 0
      }
      else{
        typeRecord.user_type = el.value
        if(el.children){
          el.children.forEach((elcld:any)=>{
              if(elcld.name === event.target.value){
                  typeRecord.subscriber_type = elcld.value
              }
          })
        }
      }

         }

    })

    console.log(typeRecord)
    localStorage.setItem('typeOfUser',JSON.stringify(typeRecord))


    localStorage.setItem("pageLink",this.linkName);
    this.topics.forEach((element:any)=>{
      if(item.name !== element.name){
       element.active = false;
      }
   })
   item.active = true;
  }

  imageUplaoad(event: any) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    var formData = new FormData();
    formData.append('image', event.target.files[0]);

    if (
      event.target.files[0] &&
      allowedMimeTypes.includes(event.target.files[0].type)
    ) {
      this.imagePath = event.target.files;
      this.imageFile = this.imagePath[0];
    }

    console.log(formData)
    this._service.uploadImage(formData).subscribe(res => {
      this.uploadedImage = res.image
      localStorage.setItem('profileImg', this.uploadedImage.location)
    })
  }

}
