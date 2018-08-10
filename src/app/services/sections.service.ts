import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Section } from '../models/section.model';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor( private http:HttpClient,
                private router:Router ) { }



  createSection( section :Section ) {

    let url = URL_SERVER + '/course_sections';

    return this.http.post( url, section )
          .pipe( map( (resp :any) => {
            this.successSectionCreateMessage(section.course_id);
            console.log(resp);
            return resp;
          }));

  }



  deleteSection( id :number ) {

    let url = URL_SERVER + '/course_sections/' + id;

    return this.http.delete( url )
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }


  updateSection( id :number, updatedSection :Section ) {

    let url = URL_SERVER + '/course_sections/' + id;

    return this.http.patch( url, updatedSection )
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }




  // Sweet Alert Messages
  successSectionCreateMessage(course_id :number): any {
    swal({
      title: 'Section created!',
      text: "Now add some lessons to it.",
      type: 'success'
    });
  }


}
