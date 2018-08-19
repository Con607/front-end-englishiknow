import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { Router } from '@angular/router';

import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../../assets/css/Navigation-with-Button.css',
    '../../../../assets/css/sidebar.css'
  ]
})


export class NavbarComponent implements OnInit {

  modal :boolean = false;
  signInStyle :any = '';

  constructor( private _navbarService:NavbarService,
                public tokenService:AngularTokenService,
                private router:Router ) { }

  ngOnInit() {
    this._navbarService.show();
  }


  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }



}
