import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../models/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {


  author_id: number = 1;
  form: FormGroup;


  constructor( private _coursesService:CoursesService,
                private router:Router,
                private _navbarService:NavbarService ) { }


  ngOnInit() {
    this._navbarService.show();
    
    this.form = new FormGroup({
      title: new FormControl( null, Validators.required ),
      description: new FormControl( null, Validators.required ),
      price: new FormControl( null, Validators.required ),
      passing_mark: new FormControl( null, Validators.required ),
      free: new FormControl( false ),
      featured: new FormControl( false ),
      reviewed: new FormControl( false ),
      published: new FormControl( false ),
      sale_price: new FormControl(),
      duration: new FormControl(),
      max_students: new FormControl(),
      feature_image: new FormControl()
    });
  }


  createCourse() {

    console.log(this.form.value);

    if ( !this.form.valid ) {
        return;
    }

    let course = new Course(
      this.author_id,
      this.form.value.title,
      this.form.value.description,
      this.form.value.price,
      this.form.value.passing_mark,
      this.form.value.free,
      this.form.value.featured,
      this.form.value.reviewed,
      this.form.value.published,
      this.form.value.sale_price,
      this.form.value.duration
    )

    this._coursesService.createCourse( course )
          .subscribe( resp => {
            console.log(resp);
          });

  }








}
