import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LmsAuthService {

  constructor(private https: HttpClient) { }

//   getLogin(data:any){
//     console.log("after" , data)
//    return this.https.post(environment.lmsApiBaseUrl + 'login',data).pipe(map(res => <any>res));
//  }
}
