import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  constructor() { }
  gettoken(){
    return !!localStorage.getItem("lms_isLogedIn");
    }

    // -----------

  // checkLogin(){
  //   return localStorage.getItem("lms_isLogedIn") === 'true';
  // }
    // -----------
}
