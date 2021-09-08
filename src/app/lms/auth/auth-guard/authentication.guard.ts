import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private AuthguardServiceService: AuthguardServiceService,
    private router: Router){
  }
  canActivate(): boolean {
    if (!this.AuthguardServiceService.gettoken()) {
      this.router.navigateByUrl("/lms/auth/login");
  }
  return this.AuthguardServiceService.gettoken();
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
