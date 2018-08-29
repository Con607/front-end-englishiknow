import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Article } from '../models/article.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  headers;

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }
  }


    getArticles( lesson_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/content_texts/';

        return this.http.get( url, {params: { lesson_id: ''+lesson_id }})
              .pipe( map( (resp :any) => {
                return resp;
              }));
      }
    }


    getArticle( article_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/content_texts/' + article_id;

        return this.http.get( url )
            .pipe( map( (resp :any) => {
              return resp;
            }));
      }
    }


    createArticle( article :Article ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/content_texts/';

        return this.http.post( url, article )
              .pipe( map( (resp :any) => {
                return resp;
              }));
      }
    }


    updateArticle( article_id :number, updatedArticle :Article ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/content_texts/' + article_id;

        return this.http.patch( url, updatedArticle )
                  .pipe( map( (resp :any) => {
                    return resp;
                  }));
      }
    }


    deleteArticle( article_id :number ) {
      if ( this.isLoggedIn() ) {
        let url = URL_SERVER + '/content_texts/' + article_id;

        return this.http.delete( url )
                .pipe( map( (resp :any) => {
                  return resp;
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
