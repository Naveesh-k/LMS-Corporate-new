import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  dataObject: any = {
    signUpData:{},
    isFilled : false
  }
  dataBehaviour = new BehaviorSubject(this.dataObject);
  dataService = this.dataBehaviour.asObservable();

  constructor(private https: HttpClient) { }

  signupDataSend(data:any){ // set data
    this.dataObject.signUpData = data
    this.dataObject.isFilled = true
    localStorage.setItem('cpSignUp', JSON.stringify(this.dataObject))
    this.dataBehaviour.next(this.dataObject)
    console.log(this.dataObject,'26')
  }
}
