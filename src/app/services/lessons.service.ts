import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_SERVER } from '../config/config';
import { Lesson } from '../models/lesson.model';

import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor( private http:HttpClient,
                private router:Router ) { }


  getLesson( lesson_id :number ) {
    let url = URL_SERVER + '/lessons/' + lesson_id;

    return this.http.get( url )
          .pipe( map( (resp :any) => {
            return resp;
          }))
  }


  createLesson( course_id :number, lesson :Lesson ) {

    let url = URL_SERVER + '/lessons';

    return this.http.post( url, lesson )
            .pipe( map( (resp :any) => {
              let new_lesson :Lesson =resp;
              this.successLessonCreateMessage( course_id );
              return resp;
            }))

  }


  updateLesson( lesson_id :number, updatedLesson :Lesson ) {

    let url = URL_SERVER + '/lessons/'+ lesson_id;

    return this.http.patch( url, updatedLesson )
            .pipe( map( (resp :any) => {
              return resp;
            }))

  }


  deleteLesson( coourse_id :number, lesson_id :number ) {

    let url = URL_SERVER + '/lessons/' + lesson_id;

    return this.http.delete( url )
            .pipe( map( (resp :any) => {
              return resp;
            }))
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
