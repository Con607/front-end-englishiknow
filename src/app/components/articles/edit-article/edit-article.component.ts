import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { Article } from '../../../models/article.model';
import { ArticlesService } from '../../../services/articles.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css',
      '../../../../assets/bootstrap/css/bootstrap.min.css',
      '../../../../assets/css/Article-List.css'
    ]
})
export class EditArticleComponent implements OnInit {


  form :FormGroup;
  lesson_id :number;
  article_id :number;
  article :Article;

  constructor( private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _articlesService:ArticlesService ) {

    activatedRoute.params.subscribe( params => {
    this.lesson_id = +params['lesson_id'];
    this.article_id = +params['article_id'];
    })


    // console.log(this.article_id);
    this._articlesService.getArticle( this.article_id )
        .subscribe( resp => {
          this.article = resp;
          // console.log(resp);
        })
  }

  ngOnInit() {
    this._navbarService.show();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      content: new FormControl()
    });
  }


  updateArticle() {

    if ( !this.form.valid ) {
        return;
    }

    let updatedArticle = new Article(
      this.lesson_id,
      this.form.value.name,
      this.form.value.content
    )

    this._articlesService.updateArticle( this.article_id, updatedArticle )
          .subscribe( resp => {
            this.successArticleUpdateMessage();
            return resp;
          })

  }




  // Sweet Alert Messages
  successArticleUpdateMessage() {
    swal({
      title: 'Article updated!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/lesson/', this.lesson_id]);
    })
  }


}
