import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Section } from '../models/section.model';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = this.getHeaders();
  }


  getHeaders() {
    return {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }
  }


  isLoggedIn() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/sign-in']);
    }
    return true;
  }


  createSection( section :Section ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/course_sections';

      return this.http.post( url, section, { headers: this.getHeaders() } )
            .pipe( map( (resp :any) => {
              this.successSectionCreateMessage(section.course_id);
              console.log(resp);
              return resp;
            }));
    }
  }



  deleteSection( id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/course_sections/' + id;

      return this.http.delete( url, { headers: this.getHeaders() } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }


  updateSection( id :number, updatedSection :Section ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/course_sections/' + id;

      return this.http.patch( url, updatedSection, { headers: this.getHeaders() } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
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
