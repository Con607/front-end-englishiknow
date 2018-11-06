import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../models/course.model';
import { NavbarService } from '../../../services/navbar.service';
import swal from 'sweetalert2'
import { SectionsService } from '../../../services/sections.service';
import { Section } from '../../../models/section.model';
import { LessonsService } from '../../../services/lessons.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

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
  author :string;

  constructor( private _coursesService:CoursesService,
                private router:Router,
                private activatedRoute:ActivatedRoute,
                private _navbarService:NavbarService,
                private _sectionsService:SectionsService,
                private _lessonsService:LessonsService,
                private authService:AuthService,
                private cartService:CartService ) {

    this.activatedRoute.params.subscribe( params => {
      this.getCourse( params['id'] );
    });

  }

  ngOnInit() {
    this._navbarService.show();
  }


  goToClassroom() {
    this.router.navigate(['/classroom/', this.course.id])
  }


  getCourse( id :number ) {
    this._coursesService.getCourse(id)
          .subscribe( (resp :Course) => {
            console.log(resp);
            this.course = resp;
            this.getAuthor( resp.author.id );
            console.log(resp.author.id);
            console.log(this.course.course_sections);
            console.log(this.course);
            // console.log('author: ' + this.course);
            // console.log('students: ' + this.course);
          });
  }


  getAuthor( author_id :number ) {
    this._coursesService.getAuthor( author_id )
          .subscribe( (res :any) => {
            console.log(res);
            this.author = res.user.email;
            console.log(this.author);
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


  addToCart( course :Course ) {
    if ( this.cartService.addToCart( course ) ) {
      this.addedToCartMessage();
    } else {
      this.alreadyInCartMessage();
    }
  }



  // Sweet Alert Messages
  addedToCartMessage(): any {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: true,
      confirmButtonText: 'Checkout',
      showCancelButton: true,
      cancelButtonText: 'Continue shopping',
      reverseButtons: true,
      showCloseButton: true,
      timer: 30000
    });

    toast({
      type: 'success',
      title: 'Course added to your cart.'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/cart']);
      }
    })
  }

  alreadyInCartMessage(): any {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    toast({
      type: 'info',
      title: 'Course already in your cart.'
    })
  }

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
