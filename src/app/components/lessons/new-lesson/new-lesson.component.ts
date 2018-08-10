import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../../services/lessons.service';
import { Lesson } from '../../../models/lesson.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';


@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  // Change this when the authentication is working
  author_id :number = 1;
  form :FormGroup;
  course_id :number;
  section_id :number;

  constructor( private _lessonsService:LessonsService,
                private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService ) {
    activatedRoute.params.subscribe( params => {
      this.course_id = +params['course_id'];
      this.section_id = +params['section_id'];
    })
    // this.section_id = activatedRoute.params['section_id'];
    // console.log('Section id = ' + this.section_id);
  }

  ngOnInit() {
    this._navbarService.show();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      duration: new FormControl(),
      preview: new FormControl( false )
    });
  }



  createLesson() {

    if ( !this.form.valid ) {
        return;
    }

    let lesson = new Lesson(
      this.form.value.name,
      this.form.value.duration,
      this.form.value.preview,
      this.author_id,
      this.section_id

    )

    this._lessonsService.createLesson( this.course_id, lesson )
          .subscribe( resp => {
            // console.log(resp);
            return resp;
          })
  }



}
