import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor( private http:HttpClient,
                private router:Router ) { }



  getCoursesList() {

    let url = URL_SERVER + '/courses';

    return this.http.get( url );

  }


  getCourse( course_id ) {
    let url = URL_SERVER + '/courses/' + course_id;

    return this.http.get( url )
          .pipe( map( (resp :Course) => {
            return resp;
          }))
  }


  createCourse( course: Course ) {

    let url = URL_SERVER + '/courses';

    return this.http.post( url, course )
          .pipe( map( (resp :any) => {
            let new_course :Course = resp;
            this.successCourseCreateMessage(new_course.id);
            return resp;
          }));

  }


  deleteCourse( id :number ) {

    let url = URL_SERVER + '/courses/' + id;

    return this.http.delete( url )
            .pipe( map( (resp :any) => {
              return resp;
            }))

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
