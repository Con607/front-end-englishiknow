import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../models/course.model';
import { NavbarService } from '../../../services/navbar.service';
import swal from 'sweetalert2'
import { SectionsService } from '../../../services/sections.service';
import { Section } from '../../../models/section.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: [
    './course.component.css',
    '../../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../../assets/css/Article-List.css'
    ]
})
export class CourseComponent implements OnInit {

  course :Course;
  section :Section;

  constructor( private _coursesService:CoursesService,
                private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _sectionsService:SectionsService ) {

    this.activatedRoute.params.subscribe( params => {
      this.getCourse( params['id'] );
    });

  }

  ngOnInit() {
    this._navbarService.show();
  }


  getCourse( id :number ) {
    this._coursesService.getCourse(id)
          .subscribe( (resp :Course) => {
            console.log(resp);
            this.course = resp;
          })
  }


  goToTestLesson() {
    this.router.navigate(['lesson']);
  }






  // Sweet Alert Messages
  newSectionMessage() {

    swal({
      title: 'New Section',
      input: 'text',
      inputPlaceholder: 'Section name',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        let section = new Section(result.value, this.course.id);
        this._sectionsService.createSection(section)
              .subscribe( resp => {
                console.log(resp);
              })
      }
    })

    // const {value: text} = await swal({
    //   title: 'New Section',
    //   input: 'text',
    //   inputPlaceholder: 'Section name',
    //   showCancelButton: true,
    //   inputValidator: (value) => {
    //   return !value && 'You need to write something!'
    // }
    // });
    //
    // if (text) {
    //     this._sectionsService.createSection(text);
    // }

  }



}
