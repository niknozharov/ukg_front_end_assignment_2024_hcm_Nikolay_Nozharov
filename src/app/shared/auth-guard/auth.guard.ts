import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isUserAuthenticated = this.authService.isUserAuthenticated();

    if (isUserAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (): boolean => {
  return inject(PermissionsService).canActivate();
};
