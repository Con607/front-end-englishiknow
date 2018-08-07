import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: [
    './team.component.css',
    '../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../assets/css/Navigation-with-Button.css',
    '../../../assets/css/sidebar.css',
    '../../../assets/css/sidebar-1.css',
    '../../../assets/css/Article-List.css',
    '../../../assets/css/Newsletter-Subscription-Form.css',
    '../../../assets/css/smoothproducts.css',
    '../../../assets/css/SIdebar-Responsive-2-1.css'
  ]
})
export class TeamComponent implements OnInit {

  constructor( private _navbarService:NavbarService ) { }

  ngOnInit() {
    this._navbarService.show();
  }

}
