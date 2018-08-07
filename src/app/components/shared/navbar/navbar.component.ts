import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../../../assets/css/Navigation-with-Button.css',
    '../../../../assets/css/sidebar.css',
    '../../../../assets/css/sidebar-1.css'
  ]
})
export class NavbarComponent implements OnInit {

  constructor( private _navbarService:NavbarService ) { }

  ngOnInit() {
    this._navbarService.show();
  }

}
