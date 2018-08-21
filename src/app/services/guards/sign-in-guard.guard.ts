import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class SignInGuardGuard implements CanActivate {

  constructor( public authService:AuthService,
                private router:Router ) { }

  canActivate() :boolean {

    if ( this.authService.isLoggedIn() ) {
      console.log('Paso el guard.');
      return true;
    } else {
      console.log('Bloqueado por el guard.');
      this.router.navigate(['/sign-in']);
      return false;
    }

  }
}
