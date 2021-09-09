import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private AuthguardServiceService: AuthguardServiceService,private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // if (localStorage.getItem('token') && localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'null') {
    //     return true;
    // }
    // this.router.navigate(['/']);
    return false;
  }
  // --------
//   isLoggedIn:any = localStorage.getItem("lms_isLogedIn") === 'true'
//   canActivate(): boolean {
//     this.router.navigateByUrl('/lms/app/home')
//      return this.isLoggedIn
//   }
// }
  // --------

}
