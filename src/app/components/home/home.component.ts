import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
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
export class HomeComponent implements OnInit {

  courses;

  constructor( private http:HttpClient,
                private _navbarService:NavbarService ) {

    // Reference on how to implement the http requests
    // console.log('Constructor del home llmaado.');
    // this.http.get('http://localhost:3000/courses')
    //             .subscribe( data => {
    //               this.courses = data;
    //               console.log(data)
    //             });

  }

  ngOnInit() {
    this._navbarService.show();
  }

}
