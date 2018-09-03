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


  createWord( word_list :WordList, word_list_form, fastVideoFile: File ) {
    if ( this.isLoggedIn() ) {
        let url1 = URL_SERVER + '/word_lists/';



        return this.http.post( url1, word_list, { headers: this.headers } )
              .pipe( map( (res :any) => {
                console.log(res);
                console.log(res.id);
                let url2 = URL_SERVER + '/word_lists/' + res.id + '/create_wsp'
                const word_list_video = new FormData();
                word_list_video.append('word_fast_video', fastVideoFile);
                word_list_video.append('word_list_id', res.id)
                this.http.post( url2, word_list_video, { headers: { 'Authorization': this.authService.getToken() } } )
                      .subscribe( res => {
                        console.log(res);
                        return res;
                      })
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
