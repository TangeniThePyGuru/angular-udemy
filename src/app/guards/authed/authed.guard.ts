import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"


@Injectable()
export class AuthedGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  canActivate(){
    if (!this.authService.isLoggedIn())
      return true;

    this.router.navigate(['/dashboard']);
    return false;
  }
}
