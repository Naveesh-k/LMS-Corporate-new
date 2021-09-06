import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/service/color-mode.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  darkMode: boolean = false;
  topics: any = [{
    name: 'Road To IPO',
    'active':false,
  },
  {
    name: 'Entrepreneurship',
    'active':false,
  },
  {
    name: 'Capital Raising',
    'active':false,
  },
  {
    name: 'Trade Finance',
    'active':false,
  },
  {
    name: 'Investing',
    'active':false,
  },
  {
    name: 'CrowdFunding',
    'active':false,
  },
  {
    name: 'Business Law',
    'active':false,
  },
  {
    name: 'Merger & Acquisitions',
    'active':false,
  }];
  customizeTopic : any = [];
  constructor(
    public mode: ColorModeService // dark-light
  ) {}

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
        element.active = !item.active;
        let index = this.customizeTopic.indexOf(element.name)
        element.active ?
          this.customizeTopic.push(element.name):
          this.customizeTopic.splice(index, 1)
       }
    })
    console.log(this.customizeTopic)
  }
}
