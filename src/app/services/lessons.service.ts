import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_SERVER } from '../config/config';
import { Lesson } from '../models/lesson.model';

import swal from 'sweetalert2'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }

  }


  getNextLesson( current_lesson_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/lessons/' + current_lesson_id;
      console.log(url);

      return this.http.get( url, { params: { next: 'true' }, headers: this.headers } )
            .pipe( map( (resp :any) => {
              console.log('Im inside LessonsService');
              console.log(resp);
              return resp;
            }));
    }
  }


  getLesson( lesson_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/lessons/' + lesson_id;

      return this.http.get( url, { headers: this.headers } )
            .pipe( map( (resp :any) => {
              return resp;
            }));
    }
  }


  createLesson( course_id :number, lesson :Lesson ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/lessons';

      return this.http.post( url, lesson, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                let new_lesson :Lesson =resp;
                this.successLessonCreateMessage( course_id );
                return resp;
              }));
    }
  }


  updateLesson( lesson_id :number, updatedLesson :Lesson ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/lessons/'+ lesson_id;

      return this.http.patch( url, updatedLesson, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }


  deleteLesson( coourse_id :number, lesson_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/lessons/' + lesson_id;

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
  successLessonCreateMessage( course_id :number ) {
    swal({
      title: 'Lesson created!',
      text: "Now add some content to it.",
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/course/', course_id]);
    })
  }


}
