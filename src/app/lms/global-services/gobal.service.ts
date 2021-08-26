import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GobalService {

  isSignup:any = false
  globalObject: any = {
    signup_data:'',
    signupType: this.isSignup
  }
  globalBehaviour = new BehaviorSubject(this.globalObject);
  globalService = this.globalBehaviour.asObservable();

  constructor(private https: HttpClient) { }

  getSignUpData(data:any){
     this.globalObject.signup_data = data;
     this.globalBehaviour.next(this.globalObject)
     console.log("after" , data)
    return this.https.post(environment.lmsApiBaseUrl + 'signup',data).pipe(map(res => <any>res));
  }
  getSocialLogin(data:any){
     console.log("after" , data)
    return this.https.post(environment.lmsApiBaseUrl + 'socialLogin',data).pipe(map(res => <any>res));
  }
  getLinkedInLogin(data:any){
    console.log("after" , data)
   return this.https.post(environment.lmsApiBaseUrl + 'linkedLogin',data).pipe(map(res => <any>res));
  }

  getSignUpEmail(data:any){
    console.log("after" , data)
    return this.https.post(environment.lmsApiBaseUrl + 'signup',data).pipe(map(res => <any>res));
  }

  checkSignupType(){
    this.globalObject.signupType = true;
    this.globalBehaviour.next(this.globalObject)

  }
}
