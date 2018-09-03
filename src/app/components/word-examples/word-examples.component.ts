import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { WordList } from '../../models/word-list';
import swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { WordExample } from '../../models/word-example';
import { WordExampleService } from '../../services/word-example.service';
import { WordListService } from '../../services/word-list.service';

@Component({
  selector: 'app-word-examples',
  templateUrl: './word-examples.component.html',
  styleUrls: ['./word-examples.component.css']
})
export class WordExamplesComponent implements OnInit {

  word :WordList;
  wordExamples :WordExample[];
  word_id :number;
  tempSlowVideo :string = 'Slow video';
  tempFastVideo :string = 'Fast video';
  form :FormGroup;
  display :string = 'none';
  isVisible :boolean = false;
  circleClass :string = 'fas fa-plus-circle';

  constructor( private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private authService:AuthService,
                private wordExampleService:WordExampleService,
                private wordListService:WordListService ) {

    this.activatedRoute.params.subscribe( params => {
      this.word_id = +params['word_id'];
    });
  }

  ngOnInit() {
    this._navbarService.show();

    this.wordListService.getWord( this.word_id )
        .subscribe( res => {
          this.word = res;
        });

    this.getWordExamples();

    this.form = new FormGroup({
      sentence: new FormControl()
    });
  }


  toggleVisible() {
    console.log(this.isVisible);
    if ( !this.isVisible ) {
      this.display = 'block';
      this.circleClass = 'fas fa-minus-circle';
    }
    if ( this.isVisible ) {
      this.display = 'none';
      this.circleClass = 'fas fa-plus-circle';
    }
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
  }


  getWordExamples() {
    this.wordExampleService.getWordExamples()
        .subscribe( res => {
          console.log(res);
          this.wordExamples = res;
        })
  }


  addWordExample() {
    if ( !this.form.valid ) {
      console.log('Something went wrong.');
      console.log(this.form);
      return;
    }

    let newWordExample = new WordExample(
      this.form.value.sentence,
      this.tempFastVideo,
      this.tempSlowVideo,
      this.word_id
    )

    this.wordExampleService.createWordExample( newWordExample )
          .subscribe( res => {
            this.successWordCreatedMessage();
            this.wordExamples.push(res);
            return res;
          })
  }


  deleteWordExample( wordExample_id :number, index :number ) {
    this.wordExampleService.deleteWordExample( wordExample_id )
          .subscribe( res => {
            console.log(res);
            this.wordExamples.splice(index, 1);
          })
  }



  // Sweet Alert Messages
  successWordCreatedMessage() {
    swal({
      title: 'Example added!',
      type: 'success'
    }).then((result) => {
      // this.router.navigate(['/update-lesson/', this.course_id , this.lesson_id]);
    })
  }

  deleteWordExampleMessage( word_id :number, index :number ) {
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
        this.deleteWordExample( word_id, index );
      }
    })
  }






}
