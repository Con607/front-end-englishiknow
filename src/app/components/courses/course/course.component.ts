import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../models/course.model';
import { NavbarService } from '../../../services/navbar.service';
import swal from 'sweetalert2'
import { SectionsService } from '../../../services/sections.service';
import { Section } from '../../../models/section.model';
import { LessonsService } from '../../../services/lessons.service';

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
                private _sectionsService:SectionsService,
                private _lessonsService:LessonsService ) {

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
            console.log(this.course.course_sections);
          });
  }



  deleteCourse( id :number ) {
    this._coursesService.deleteCourse( id )
          .subscribe( resp => {
            console.log(resp);
            this.router.navigate(['/courses']);
          })
  }



  createSection( name:string ) {
    let section = new Section(name, this.course.id);
    this._sectionsService.createSection(section)
          .subscribe( resp => {
            // console.log('Im inside course.component');
            // console.log(resp);
            this.course = resp;
          })
  }


  deleteSection( id :number ) {
    this._sectionsService.deleteSection( id )
          .subscribe( resp => {
            this.course = resp;
            console.log(resp);
          })
  }


  updateSection( section :Section, name :string ) {
    let updatedSection = new Section(name, this.course.id);
    this._sectionsService.updateSection( section.id, updatedSection )
          .subscribe( resp => {
            console.log(resp);
            this.course = resp;
          })
  }



  addNewLesson( section :Section ) {
    this.router.navigate(['/new-lesson/', section.course_id, section.id]);
  }

  deleteLesson( course_id :number, lesson_id :number ) {
    this._lessonsService.deleteLesson( course_id, lesson_id )
          .subscribe( resp => {
            this.course = resp;
            console.log(resp);
          })
  }


  updateLesson( course_id :number, lesson_id :number ) {
    this.router.navigate(['/update-lesson/', course_id, lesson_id])
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
        this.createSection( result.value );
      }
    })
  }

  deleteSectionMessage( id :number ) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this! The lessons inside it will be deleted too.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteSection( id );
        swal(
          'Deleted!',
          'The section has been deleted.',
          'success'
        )
      }
    })
  }

  updateSectionMessage( section :Section ) {
    swal({
      title: 'Editing Section',
      input: 'text',
      inputPlaceholder: section.name,
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.updateSection( section, result.value );
        swal(
          'Updated!',
          'The section has been updated.',
          'success'
        )
      }
    })
  }


  deleteCourseMessage( course :Course ) {
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
        this.deleteCourse( course.id );
        swal(
          'Deleted!',
          'The section has been deleted.',
          'success'
        )
      }
    })
  }


  deleteLessonMessage( course_id :number, lesson_id :number ) {
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
        this.deleteLesson( course_id, lesson_id );
        swal(
          'Deleted!',
          'The section has been deleted.',
          'success'
        )
      }
    })
  }


}
