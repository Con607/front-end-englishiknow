import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../../services/lessons.service';
import { Lesson } from '../../../models/lesson.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import swal from 'sweetalert2';
import { Article } from '../../../models/article.model';
import { ArticlesService } from '../../../services/articles.service';
import { ContTransSentenceEnglish } from '../../../models/cont-trans-sentence-english';
import { ContTransSentenceEnglishService } from '../../../services/cont-trans-sentence-english.service';


@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.css',
      '../../../../assets/bootstrap/css/bootstrap.min.css',
      '../../../../assets/css/Article-List.css'
    ]
})
export class UpdateLessonComponent implements OnInit {

  // Change this when the authentication is working
  form :FormGroup;
  course_id :number;
  lesson_id :number;
  lesson :Lesson;

  constructor( private _lessonsService:LessonsService,
                private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _articlesService:ArticlesService,
                private _transToEngService:ContTransSentenceEnglishService ) {

    activatedRoute.params.subscribe( params => {
      this.course_id = +params['course_id'];
      this.lesson_id = +params['lesson_id'];
    })
    // this.section_id = activatedRoute.params['section_id'];
    // console.log('Section id = ' + this.section_id);

    this._lessonsService.getLesson( this.lesson_id )
          .subscribe( resp => {
            this.lesson = resp;
            console.log(resp);
          })
  }

  ngOnInit() {
    this._navbarService.show();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      duration: new FormControl(),
      preview: new FormControl( false )
    });
  }



  updateLesson() {

    if ( !this.form.valid ) {
        return;
    }

    let updatedLesson = new Lesson(
      this.form.value.name,
      this.form.value.duration,
      this.form.value.preview,
      this.lesson.author_id,
      this.lesson.course_section_id
    )

    // console.log(this.lesson.id);
    this._lessonsService.updateLesson( this.lesson.id, updatedLesson )
          .subscribe( resp => {
            this.successLessonUpdateMessage();
            return resp;
          })

  }



  createTransToEnglish( name :string ) {
    let transToEnglish = new ContTransSentenceEnglish( this.lesson.id, name );

    this._transToEngService.createTransToEnglish( transToEnglish )
          .subscribe( resp => {
            this.lesson = resp;
            return resp;
          })
  }


  deleteTransToEnglish( transToEnglish_id :number ) {
    this._transToEngService.deleteTransToEnglish( transToEnglish_id )
          .subscribe( resp => {
            console.log(resp);
            this.lesson = resp;
            return resp;
          })
  }


  createArticle( name :string ) {
    let article = new Article( this.lesson.id, name, '<p>Write your article here...</p>' );
    // console.log(article);
    this._articlesService.createArticle( article )
          .subscribe( resp => {
            // console.log(resp);
            this.lesson = resp;
            return resp;
          })
  }


  deleteArticle( article_id :number ) {
    this._articlesService.deleteArticle( article_id )
          .subscribe( resp => {
            console.log(resp);
            this.lesson = resp;
            return resp;
          })
  }


  goToEditArticle( lesson_id :number, article_id :number) {
    // console.log(article_id);
    this.router.navigate(['/edit-article/', lesson_id, article_id, this.course_id]);
  }

  goToEditTransToEnglish( lesson_id :number, transToEnglish_id :number ) {
    this.router.navigate(['/edit-translate-eng-to-spa/', lesson_id, transToEnglish_id, this.course_id]);
  }



  // Sweet Alert Messages
  successLessonUpdateMessage() {
    swal({
      title: 'Lesson updated!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/course/', this.course_id]);
    })
  }


  async addContentMessage() {
    const {value: contentType} = await swal({
      title: 'Select a type of content',
      input: 'select',
      inputPlaceholder: 'Select a content type',
      inputOptions: {
        'Article': 'Article',
        'Trans-To-English': 'Translate to English',
        'Trans-To-Spanish': 'Translate to Spanish',
        'Word List': 'Word List'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'Article') {
            this.createArticleMessage();
            // resolve();
          } else if (value === 'Trans-To-English') {
            this.createTransToEnglishMessage();
            // resolve();
          } else if (value === 'Trans-To-Spanish') {
            resolve();
          } else if (value === 'Word List') {
            resolve();
          }
        }
        )
      }
    })
  }

  createTransToEnglishMessage() {
    swal({
      title: 'Create Translation to English Excercise',
      input: 'text',
      inputPlaceholder: "Content's name",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.createTransToEnglish( result.value );
        swal(
          'Created!',
          'The article has been updated.',
          'success'
        )
      }
    })
  }


  deleteTransToEnglishMessage( transToEnglish_id :number) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteTransToEnglish( transToEnglish_id );
        swal(
          'Deleted!',
          'It has been deleted.',
          'success'
        )
      }
    })
  }


  createArticleMessage() {
    swal({
      title: 'Create Article',
      input: 'text',
      inputPlaceholder: "Article's name",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.createArticle( result.value );
        swal(
          'Created!',
          'The article has been updated.',
          'success'
        )
      }
    })
  }


  deleteArticleMessage( article_id :number ) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteArticle( article_id );
        swal(
          'Deleted!',
          'The article has been deleted.',
          'success'
        )
      }
    })
  }


  contnetSuccesfullyAddedMessage() {
    swal({
      title: 'Content succesfully added!',
      type: 'success'
    });
  }




}
