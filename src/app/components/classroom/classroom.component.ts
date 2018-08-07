import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: [
      './classroom.component.css',
      '../../../assets/css/Article-Clean.css',
      '../../../assets/css/Collapsible-sidebar-left-or-right--Content-overlay.css',
      '../../../assets/css/Navigation-with-Button.css',
      '../../../assets/css/Projects-Clean.css',
      ]
})
export class ClassroomComponent implements OnInit {

  sidebar :boolean;

  constructor( private _navbarService:NavbarService,
                private router:Router) {
                  this.sidebar = false;
                }

  ngOnInit() {
    this._navbarService.hide();
  }


  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }



}
