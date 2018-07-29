import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses;

  constructor( private http:HttpClient ) {

    // Reference on how to implement the http requests
    // console.log('Constructor del home llmaado.');
    // this.http.get('http://localhost:3000/courses')
    //             .subscribe( data => {
    //               this.courses = data;
    //               console.log(data)
    //             });

  }

  ngOnInit() {
  }

}
