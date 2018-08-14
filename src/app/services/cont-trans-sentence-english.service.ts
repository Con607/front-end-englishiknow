import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ContTransSentenceEnglish } from '../models/cont-trans-sentence-english';

@Injectable({
  providedIn: 'root'
})
export class ContTransSentenceEnglishService {

  constructor( private http:HttpClient,
                private router:Router ) { }



  createTransToEnglish( transToEnglish :ContTransSentenceEnglish ) {
    let url = URL_SERVER + '/cont_trans_sentence_englishes/';

    return this.http.post( url, transToEnglish )
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
