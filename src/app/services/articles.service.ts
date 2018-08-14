import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Article } from '../models/article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor( private http:HttpClient,
                private router:Router ) { }


    getArticle( article_id :number ) {
      let url = URL_SERVER + '/content_texts/' + article_id;

      return this.http.get( url )
          .pipe( map( (resp :any) => {
            return resp;
          }))
    }


    createArticle( article :Article ) {

      let url = URL_SERVER + '/content_texts/';

      return this.http.post( url, article )
            .pipe( map( (resp :any) => {
              return resp;
            }))
    }


    updateArticle( article_id :number, updatedArticle :Article ) {
      let url = URL_SERVER + '/content_texts/' + article_id;

      return this.http.patch( url, updatedArticle )
                .pipe( map( (resp :any) => {
                  return resp;
                }))
    }


    deleteArticle( article_id :number ) {

      let url = URL_SERVER + '/content_texts/' + article_id;

      return this.http.delete( url )
              .pipe( map( (resp :any) => {
                return resp;
              }))

    }




}
