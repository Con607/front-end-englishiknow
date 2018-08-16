import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { Article } from '../../../models/article.model';
import { ArticlesService } from '../../../services/articles.service';
import swal from 'sweetalert2';

import { CKEditorComponent } from 'ng2-ckeditor';
import { KeepHtmlPipe } from '../../../pipes/keep-html.pipe';


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
  course_id :number;
  article :Article;

  ckeditorContent :string;
  @ViewChild(CKEditorComponent) ckEditor :CKEditorComponent;

  constructor( private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _articlesService:ArticlesService ) {

    activatedRoute.params.subscribe( params => {
      this.lesson_id = +params['lesson_id'];
      this.article_id = +params['article_id'];
      this.course_id = +params['course_id'];
    })


    // console.log(this.article_id);
    this._articlesService.getArticle( this.article_id )
        .subscribe( resp => {
          this.article = resp;
          this.ckeditorContent = this.article.content;
          // console.log(resp);
        })
  }

  ngOnInit() {
    this._navbarService.show();

    this.form = new FormGroup({
      name: new FormControl(  ),
      content: new FormControl()
    });
  }



  // ngAfterViewChecked() {
  //   let editor = this.ckEditor.instance();
  //   editor.config.height = '400';
  //   editor.config.toolbarGroup = [
  //     { name: 'document', groups: ['mode', 'document', 'doctools'] },
  //     { name: 'clipboard', groups: ['clipboard', 'undo'] },
  //     { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
  //     { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']  },
  //     { name: 'insert', groups: ['insert'] }
  //   ];
  //   editor.config.removeButtons = 'Source,Save,Templates,Find,Replace,Scayt,SelectAll,Form,Radio';
  // }



  updateArticle() {

    if ( !this.form.valid ) {
      console.log('Something went wrong.');
      console.log(this.form);
      return;
    }

    let updatedArticle = new Article(
      this.lesson_id,
      this.form.value.name,
      this.ckeditorContent
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
      this.router.navigate(['/update-lesson/', this.course_id , this.lesson_id]);
    })
  }


}
