import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { ContTransSentenceEnglish } from '../models/cont-trans-sentence-english';
import swal from 'sweetalert2'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContTransSentenceEnglishService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
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


  getTransToEnglishes( lesson_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/cont_trans_sentence_englishes/';

      return this.http.get( url, { params: { lesson_id: ''+lesson_id }, headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }


  getTransToEnglish( transToEnglish_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

      return this.http.get( url, { headers: this.headers } )
          .pipe( map( (resp :any) => {
            return resp;
          }));
    }
  }


  createTransToEnglish( transToEnglish :ContTransSentenceEnglish ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/cont_trans_sentence_englishes/';

      return this.http.post( url, transToEnglish, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }


  updateTransToEnglish( transToEnglish_id :number, updatedTransToEnglish :ContTransSentenceEnglish ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

      return this.http.patch( url, updatedTransToEnglish, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }


  deleteTransToEnglish( transToEnglish_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

      return this.http.delete( url, { headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
    }
  }



}
