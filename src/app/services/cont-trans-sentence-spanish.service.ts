import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { ContTransSentenceSpanish } from '../models/cont-trans-sentence-spanish';
import swal from 'sweetalert2'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ContTransSentenceSpanishService {

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


    getTransToSpanishes( lesson_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/cont_trans_sentence_spanishes/';

        return this.http.get( url, { params: { lesson_id: ''+lesson_id }, headers: this.headers } )
              .pipe( map( (resp :any) => {
                return resp;
              }));
      }
    }


    getTransToSpanish( transToSpanish_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

        return this.http.get( url, { headers: this.headers } )
            .pipe( map( (resp :any) => {
              return resp;
            }));
      }
    }


    createTransToSpanish( transToSpanish :ContTransSentenceSpanish ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/cont_trans_sentence_spanishes/';

        return this.http.post( url, transToSpanish, { headers: this.headers } )
                .pipe( map( (resp :any) => {
                  return resp;
                }));
      }
    }


    updateTransToSpanish( transToSpanish_id :number, updatedTransToSpanish :ContTransSentenceSpanish ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

        return this.http.patch( url, updatedTransToSpanish, { headers: this.headers } )
                .pipe( map( (resp :any) => {
                  return resp;
                }));
      }
    }


    deleteTransToSpanish( transToSpanish_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

        return this.http.delete( url, { headers: this.headers } )
                .pipe( map( (resp :any) => {
                  return resp;
                }));
      }
    }


}
