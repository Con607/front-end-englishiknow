import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { WordExample } from '../models/word-example';

@Injectable({
  providedIn: 'root'
})
export class WordExampleService {

  headers;
  word_id :number;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }
  }


  getWordExamples() {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_examples';

      return this.http.get( url, { headers: this.headers } )
            .pipe( map( (res :any) => {
              console.log(res);
              return res;
            }));
    }
  }


  isLoggedIn() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/sign-in']);
    }
    return true;
  }


  createWordExample( word_example :WordExample ) {
    if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/word_examples'

        return this.http.post( url, word_example, { headers: this.headers } )
              .pipe( map( (res :any) => {
                console.log(res);
                return res;
              }))
    }
  }


  deleteWordExample( word_example_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_examples/' + word_example_id;

      return this.http.delete( url, { headers: this.headers } )
              .pipe( map( (res :any) => {
                return res;
              }));
    }
  }







}
