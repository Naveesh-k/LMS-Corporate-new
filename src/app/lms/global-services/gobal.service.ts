import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GobalService {

  globalObject: any = {
    signup_data:''
  }
  globalBehaviour = new BehaviorSubject(this.globalObject);
  globalService = this.globalBehaviour.asObservable();

  constructor(private https: HttpClient) { }

  // getSignUpData(data:any){
  //   console.log(data)
  //    this.globalObject.signup_data = data;
  //    this.globalBehaviour.next(this.globalObject)
  //    console.log("after" , this.globalObject)
  // }

  getSignUpData(data:any){
     this.globalObject.signup_data = data;
     this.globalBehaviour.next(this.globalObject)
     console.log("after" , this.globalObject)
    return this.https.post(environment.lmsApiBaseUrl + 'signup',data).pipe(map(res => <any>res));
  }

}
