import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContTransSentenceEnglish } from '../../../models/cont-trans-sentence-english';
import { ContTransSentenceEnglishService } from '../../../services/cont-trans-sentence-english.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-trans-to-english',
  templateUrl: './edit-trans-to-english.component.html',
  styleUrls: ['./edit-trans-to-english.component.css']
})
export class EditTransToEnglishComponent implements OnInit {


  form :FormGroup;
  lesson_id :number;
  course_id :number;
  transToEnglish_id :number;
  transToEnglish :ContTransSentenceEnglish;

  constructor( private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _transToEnglishService:ContTransSentenceEnglishService ) {

    activatedRoute.params.subscribe( params => {
      this.lesson_id = +params['lesson_id'];
      this.transToEnglish_id = +params['transToEnglish_id'];
      this.course_id = +params['course_id'];
    })

    this._transToEnglishService.getTransToEnglish( this.transToEnglish_id )
        .subscribe( resp => {
          this.transToEnglish = resp;
        })
  }


  ngOnInit() {
    this._navbarService.show();

    this.form = new FormGroup({
      name: new FormControl(),
      sentence: new FormControl(),
      translation: new FormControl()
    });
  }



  updateTransToEnglish() {

    if ( !this.form.valid ) {
        return;
    }

    let updatedTransToEnglish = new ContTransSentenceEnglish(
      this.lesson_id,
      this.form.value.name,
      this.form.value.sentence,
      this.form.value.translation
    )

    this._transToEnglishService.updateTransToEnglish( this.transToEnglish_id, updatedTransToEnglish )
          .subscribe( resp => {
            this.successTransToEnglishUpdateMessage();
            return resp;
          })

  }



  // Sweet Alert Messages
  successTransToEnglishUpdateMessage() {
    swal({
      title: 'Updated!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/update-lesson/', this.course_id , this.lesson_id]);
    })
  }



}
