import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { ContTransSentenceEnglish } from '../models/cont-trans-sentence-english';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ContTransSentenceEnglishService {

  constructor( private http:HttpClient,
                private router:Router ) { }


  getTransToEnglishes( lesson_id :number ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/';

    return this.http.get( url, { params: { lesson_id: ''+lesson_id } })
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }


  getTransToEnglish( transToEnglish_id :number ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

    return this.http.get( url )
        .pipe( map( (resp :any) => {
          return resp;
        }))
  }


  createTransToEnglish( transToEnglish :ContTransSentenceEnglish ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/';

    return this.http.post( url, transToEnglish )
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }


  updateTransToEnglish( transToEnglish_id :number, updatedTransToEnglish :ContTransSentenceEnglish ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

    return this.http.patch( url, updatedTransToEnglish )
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }


  deleteTransToEnglish( transToEnglish_id :number ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/' + transToEnglish_id;

    return this.http.delete( url )
            .pipe( map( (resp :any) => {
              return resp;
            }))
  }



}
