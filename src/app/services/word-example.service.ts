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


  getWordExamples( word_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_lists/' + word_id + '/word_examples';

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


  createWordExample( word_id :number, word_example :WordExample, word_example_form, fastVideoFile: File, slowVideoFile: File ) {
    if ( this.isLoggedIn() ) {
        let url1 = URL_SERVER + '/word_lists/' + word_id + '/word_examples'

        return this.http.post( url1, word_example, { headers: this.headers } )
              .pipe( map( (res :any) => {
                console.log(res);
                console.log(res.id);
                console.log(fastVideoFile);
                console.log(slowVideoFile);
                let url2 = URL_SERVER + '/word_lists/' + word_id + '/word_examples/' + res.id + '/create_ssp'
                const word_example_video = new FormData();
                word_example_video.append('sentence_fast_video', fastVideoFile);
                word_example_video.append('sentence_slow_video', slowVideoFile);
                word_example_video.append('word_example_id', res.id)
                console.log(word_example_video);
                this.http.post( url2, word_example_video, { headers: { 'Authorization': this.authService.getToken() } } )
                      .subscribe( res => {
                        console.log(res);
                        return res;
                      })
                return res;
              }))
    }
  }


  deleteWordExample( word_id :number, word_example_id :number ) {
    if ( this.isLoggedIn() ) {
      let url = URL_SERVER + '/word_lists/' + word_id + '/word_examples/' + word_example_id;

      return this.http.delete( url, { headers: this.headers } )
              .pipe( map( (res :any) => {
                return res;
              }));
    }
  }







}
