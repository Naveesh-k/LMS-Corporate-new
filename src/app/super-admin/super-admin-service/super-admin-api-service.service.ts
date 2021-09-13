import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminApiServiceService {
  token :any = localStorage.getItem('token')
  constructor(private https: HttpClient) { }

 createCourses(data:any){
   console.log(this.token, '14')
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token,
  });
   return this.https.post(environment.lmsApiBaseUrl + 'createCourse',data,{headers}).pipe(map(res => <any>res));
 }
}
