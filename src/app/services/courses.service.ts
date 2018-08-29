import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }
  }



  getCoursesList() {
      let url = URL_SERVER + '/courses';
      return this.http.get( url );
  }


  getCourse( course_id ) {
    let url = URL_SERVER + '/courses/' + course_id;

    return this.http.get( url, { headers: this.headers } )
          .pipe( map( (resp :Course) => {
            return resp;
          }))
  }


  createCourse( course: Course ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/courses';

      return this.http.post( url, course, { headers: this.headers } )
            .pipe( map( (resp :any) => {
              let new_course :Course = resp;
              this.successCourseCreateMessage(new_course.id);
              return resp;
            }));
    }
  }


  deleteCourse( id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/courses/' + id;

      return this.http.delete( url, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }

  }



  isLoggedIn() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/sign-in']);
    }
    return true;
  }


  // Sweet Alert Messages
  successCourseCreateMessage( id :number): any {
    swal({
      title: 'Course created!',
      text: "Now add some sections and lessons to it.",
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/course/', id]);
    })
  }


}
