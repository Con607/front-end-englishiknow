import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContTransSentenceSpanish } from '../../../models/cont-trans-sentence-spanish';
import { ContTransSentenceSpanishService } from '../../../services/cont-trans-sentence-spanish.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-trans-to-spanish',
  templateUrl: './edit-trans-to-spanish.component.html',
  styleUrls: ['./edit-trans-to-spanish.component.css']
})
export class EditTransToSpanishComponent implements OnInit {

  form :FormGroup;
  lesson_id :number;
  course_id :number;
  transToSpanish_id :number;
  transToSpanish :ContTransSentenceSpanish;

  constructor( private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _transToSpanishService:ContTransSentenceSpanishService ) {

    activatedRoute.params.subscribe( params => {
      this.lesson_id = +params['lesson_id'];
      this.transToSpanish_id = +params['transToSpanish_id'];
      this.course_id = +params['course_id'];
    })

    this._transToSpanishService.getTransToSpanish( this.transToSpanish_id )
          .subscribe( resp => {
            this.transToSpanish = resp;
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


  updateTransToSpanish() {

    if ( !this.form.valid ) {
        return;
    }

    let updatedTransToSpanish = new ContTransSentenceSpanish(
      this.lesson_id,
      this.form.value.name,
      this.form.value.sentence,
      this.form.value.translation
    )

    this._transToSpanishService.updateTransToSpanish( this.transToSpanish_id, updatedTransToSpanish )
          .subscribe( resp => {
            this.successTransToSpanishUpdateMessage();
            return resp;
          })

  }



  // Sweet Alert Messages
  successTransToSpanishUpdateMessage() {
    swal({
      title: 'Updated!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/update-lesson/', this.course_id , this.lesson_id]);
    })
  }

}
