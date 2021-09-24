import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GobalService {
  token: any = localStorage.getItem('token')

  globalObject: any = {
    signup_data: '',
    signupType: false
  }
  globalBehaviour = new BehaviorSubject(this.globalObject);
  globalService = this.globalBehaviour.asObservable();

  constructor(private https: HttpClient) { }

  getSignUpData(data: any) {
    this.globalObject.signup_data = data;
    this.globalBehaviour.next(this.globalObject)
    console.log("after", data)
    return this.https.post(environment.lmsApiBaseUrl + 'signup', data).pipe(map(res => <any>res));
  }
  // getSocialLogin(data:any){
  //    console.log("after" , data)
  //   return this.https.post(environment.lmsApiBaseUrl + 'socialLogin',data).pipe(map(res => <any>res));
  // }
  getSocialLogin(data: any) {
    console.log("after", data)
    return this.https.post(environment.lmsApiBaseUrl + 'social_login', data).pipe(map(res => <any>res));
  }
  getLinkedInLogin(data: any) {
    console.log("after", data)
    return this.https.post(environment.lmsApiBaseUrl + 'linkedLogin', data).pipe(map(res => <any>res));
  }

  getSignUpEmail(data: any) {
    console.log("after", data)
    return this.https.post(environment.lmsApiBaseUrl + 'signup', data).pipe(map(res => <any>res));
  }
  postFacebookLogin(data: any) {
    console.log("after", data)
    return this.https.post(environment.lmsApiBaseUrl + 'fbLogin', data).pipe(map(res => <any>res));
  }

  checkSignupType() {
    this.globalObject.signupType = true;
    this.globalBehaviour.next(this.globalObject);
    localStorage.setItem('signupType', 'true')
  }

  uploadImage(data: any) {
    let headers: any = new HttpHeaders({
      // Authorization: this.token,
      mimeType: 'multipart/form-data'
    });
    console.log(headers, "profile update 57")

    return this.https.post(environment.lmsApiBaseUrl + 'upload', data, { headers }).pipe(map(res => <any>res));
  }

  profileDataShow() {
    console.log("Api hit successfully global.service.ts 67")
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    return this.https.get(environment.lmsApiBaseUrl + 'showProfile', { headers }).pipe(map(res => <any>res));

  }

  profileUpdate(data: any) {
    console.log("profile update 76")
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    return this.https.put(environment.lmsApiBaseUrl + 'updateUserProfile', data, { headers }).pipe(map(res => <any>res));
  }
}
