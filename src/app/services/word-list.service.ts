import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { WordList } from '../models/word-list';


@Injectable({
  providedIn: 'root'
})

export class WordListService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }
  }


  getList() {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_lists';

      return this.http.get( url, { headers: this.headers } )
            .pipe( map( (res :any) => {
              console.log(res);
              return res;
            }));
    }
  }


  getWord( word_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_lists/' + word_id;

      return this.http.get( url, { headers: this.headers } )
            .pipe( map( (res :any) => {
              console.log(res);
              return res;
            }));
    }
  }


  createWord( word_list :WordList ) {
    if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/word_lists'

        return this.http.post( url, word_list, { headers: this.headers } )
              .pipe( map( (res :any) => {
                console.log(res);
                return res;
              }))
    }
  }


  deleteWord( word_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_lists/' + word_id;

      return this.http.delete( url, { headers: this.headers } )
              .pipe( map( (res :any) => {
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


}
