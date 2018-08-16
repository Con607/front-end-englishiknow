import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { ContTransSentenceSpanish } from '../models/cont-trans-sentence-spanish';
import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class ContTransSentenceSpanishService {

  constructor( private http:HttpClient,
                private router:Router ) {}


    getTransToSpanishes( lesson_id :number ) {
      let url = URL_SERVER + '/cont_trans_sentence_spanishes/';

      return this.http.get( url, { params: { lesson_id: ''+lesson_id } } )
            .pipe( map( (resp :any) => {
              return resp;
            }))
    }


    getTransToSpanish( transToSpanish_id :number ) {
      let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

      return this.http.get( url )
          .pipe( map( (resp :any) => {
            return resp;
          }))
    }


    createTransToSpanish( transToSpanish :ContTransSentenceSpanish ) {
      let url = URL_SERVER + '/cont_trans_sentence_spanishes/';

      return this.http.post( url, transToSpanish )
              .pipe( map( (resp :any) => {
                return resp;
              }))
    }


    updateTransToSpanish( transToSpanish_id :number, updatedTransToSpanish :ContTransSentenceSpanish ) {
      let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

      return this.http.patch( url, updatedTransToSpanish )
              .pipe( map( (resp :any) => {
                return resp;
              }))
    }


    deleteTransToSpanish( transToSpanish_id :number ) {
      let url = URL_SERVER + '/cont_trans_sentence_spanishes/' + transToSpanish_id;

      return this.http.delete( url )
              .pipe( map( (resp :any) => {
                return resp;
              }))
    }


}
