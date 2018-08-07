import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses :Course[] = [];

  constructor( private _coursesService:CoursesService,
                private router:Router,
                private _navbarService:NavbarService ) { }

  ngOnInit() {
    this._navbarService.show();
    
    this.getCoursesList();
  }

  getCoursesList() {
    this._coursesService.getCoursesList()
        .subscribe( (resp :any) => {
          console.log(resp);
          this.courses = resp;
          console.log(this.courses);
        })
  }

  goToCourse( index ) {
    console.log(index);
    this.router.navigate(['/course', index]);
  }

  goToNewCourse() {
    this.router.navigate(['/new-course']);
  }

}
