import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { WordListService } from '../../services/word-list.service';
import { WordList } from '../../models/word-list';
import swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})

export class WordListComponent implements OnInit {

  words :WordList[];
  tempSlowVideo :string = 'Slow video';
  tempFastVideo :string = 'Fast video';
  form :FormGroup;
  display :string = 'none';
  isVisible :boolean = false;
  circleClass :string = 'fas fa-plus-circle';

  @ViewChild('fastVideoInput') fastVideoInput;


  constructor( private router:Router,
                private _navbarService:NavbarService,
                private authService:AuthService,
                private wordListService:WordListService ) { }

  ngOnInit() {
    this._navbarService.show();

    this.getWordList();

    this.form = new FormGroup({
      word: new FormControl()
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


  getWordList() {
    this.wordListService.getList()
        .subscribe( res => {
          console.log(res);
          this.words = res;
        })
  }


  addWord() {
    if ( !this.form.valid ) {
      console.log('Something went wrong.');
      console.log(this.form);
      return;
    }

    let newWord = new WordList(
      this.form.value.word,
      this.tempFastVideo,
      this.tempSlowVideo
    )

    const fastVideoFile = this.fastVideoInput.nativeElement.files[0];

    this.wordListService.createWord( newWord, this.form.value, fastVideoFile )
          .subscribe( res => {
            this.successWordCreatedMessage();
            this.words.push(res);
            return res;
          })
  }


  deleteWord( word_id :number, index :number ) {
    this.wordListService.deleteWord( word_id )
          .subscribe( res => {
            console.log(res);
            this.words.splice(index, 1);
          })
  }

  goToWordExamples( word_id :number ) {
    console.log(word_id);
    this.router.navigate(['/word-examples', word_id]);
  }



  // Sweet Alert Messages
  successWordCreatedMessage() {
    swal({
      title: 'Word added!',
      type: 'success'
    }).then((result) => {
      // this.router.navigate(['/update-lesson/', this.course_id , this.lesson_id]);
    })
  }

  deleteWordMessage( word_id :number, index :number ) {
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
        this.deleteWord( word_id, index );
      }
    })
  }



}
