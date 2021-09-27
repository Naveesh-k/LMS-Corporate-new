import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GobalService {
  token: any = ''

  globalObject: any = {
    signup_data: '',
    signupType: false
  }
  globalBehaviour = new BehaviorSubject(this.globalObject);
  globalService = this.globalBehaviour.asObservable();

  constructor(private https: HttpClient) {
    this.token = localStorage.getItem('token')
    let getUserdetail: any = localStorage.getItem('userDetail');
    let parseDetail: any = JSON.parse(getUserdetail)

    let socialToken: any = localStorage.getItem('socialtoken');
    let parsesocialToken: any = JSON.parse(socialToken)

    console.log("Global at 27", parseDetail)
    console.log("Global at 28", parsesocialToken)

    if (parseDetail !== null) {
      if(parsesocialToken === null){
        if(parsesocialToken.provider === 'FACEBOOK'){
           this.token = parsesocialToken.authToken
        }
      }
      else{
        if (parsesocialToken.social) {
          this.token = parsesocialToken.token
        }
      }
    }
    else {
      this.token = localStorage.getItem('token')
    }

    console.log("Global at service", this.token)
  }

  checkSignupType() {
    this.globalObject.signupType = true;
    this.globalBehaviour.next(this.globalObject);
    localStorage.setItem('signupType', 'true')
  }

  getSignUpData(data: any) {
    this.globalObject.signup_data = data;
    this.globalBehaviour.next(this.globalObject)
    return this.https.post(environment.lmsApiBaseUrl + 'signup', data).pipe(map(res => <any>res));
  }
  // getSocialLogin(data:any){
  //    console.log("after" , data)
  //   return this.https.post(environment.lmsApiBaseUrl + 'socialLogin',data).pipe(map(res => <any>res));
  // }
  getSocialLogin(data: any) {
    return this.https.post(environment.lmsApiBaseUrl + 'social_login', data).pipe(map(res => <any>res));
  }
  getLinkedInLogin(data: any) {
    return this.https.post(environment.lmsApiBaseUrl + 'linkedLogin', data).pipe(map(res => <any>res));
  }

  getSignUpEmail(data: any) {
    return this.https.post(environment.lmsApiBaseUrl + 'signup', data).pipe(map(res => <any>res));
  }
  postFacebookLogin(data: any) {
    return this.https.post(environment.lmsApiBaseUrl + 'fbLogin', data).pipe(map(res => <any>res));
  }



  uploadImage(data: any) {
    let headers: any = new HttpHeaders({
      // Authorization: this.token,
      mimeType: 'multipart/form-data'
    });
    return this.https.post(environment.lmsApiBaseUrl + 'upload', data, { headers }).pipe(map(res => <any>res));
  }

  profileDataShow() {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    console.log(this.token)
    console.log('profile header :', headers)
    return this.https.get(environment.lmsApiBaseUrl + 'showProfile', { headers }).pipe(map(res => <any>res));

  }

  profileUpdate(data: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    return this.https.put(environment.lmsApiBaseUrl + 'updateUserProfile', data, { headers }).pipe(map(res => <any>res));
  }

  // Course provider / developer API start
  createCourse(data: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    return this.https.post(environment.lmsApiBaseUrl + 'createCourse', data, { headers }).pipe(map(res => <any>res));
  }
  getCourse() {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    return this.https.get(environment.lmsApiBaseUrl + 'getAllCourse', { headers }).pipe(map(res => <any>res));
  }
  updateCourse(data: any, id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    const url = `${environment.lmsApiBaseUrl}updateCourse/${id}`;
    return this.https.put(url, data, { headers }).pipe(map(res => <any>res));
  }
  deleteCourse(id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    const url = `${environment.lmsApiBaseUrl}deleteCourse/${id}`;
    return this.https.get(url, { headers }).pipe(map(res => <any>res));
  }

  // Add leacture
  addLecture(data: any, id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    const url = `${environment.lmsApiBaseUrl}addLecture/${id}`;
    return this.https.post(url, data, { headers }).pipe(map(res => <any>res));
  }
  // Add quiz
  addQuiz(data: any, id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    const url = `${environment.lmsApiBaseUrl}create_quiz/${id}`;
    return this.https.post(url, data, { headers }).pipe(map(res => <any>res));
  }
  // Quiz list
  quizList(id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    const url = `${environment.lmsApiBaseUrl}showall_quiz/${id}`;
    return this.https.get(url, { headers }).pipe(map(res => <any>res));
  }
  // lecture list
  lectureList(id: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    });
    console.log("check header add lecture =>", headers)
    const url = `${environment.lmsApiBaseUrl}readLecture/${id}`;
    return this.https.get(url, { headers }).pipe(map(res => <any>res));
  }

}
