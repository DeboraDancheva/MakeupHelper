import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardFunction {
    
    constructor(private authService: AuthenticationService, private router: Router) { }
  
    canActivate(): boolean | UrlTree {debugger;
        const oauthService: AuthenticationService = inject(AuthenticationService);
        const router: Router = inject(Router);
        const currentUser = oauthService.currentUserValue;
        if (currentUser) {
          // User is authenticated, allow access to the route
          return true;
        }
    
        // User is not authenticated, redirect to login page with the return URL
        router.navigate(['']);
        return false;
    }
    
  }

    