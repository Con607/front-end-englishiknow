import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses :Course[] = [];

  constructor( private _coursesService:CoursesService,
                private router:Router,
                private _navbarService:NavbarService,
                private authService:AuthService,
                private cartService:CartService ) { }

  ngOnInit() {
    this._navbarService.show();

    this.getCoursesList();
  }


  addToWishList( course_id :number ) {
    console.log('Im inside addWishList.');
  }

  addToCart( course :Course ) {
    if ( this.cartService.addToCart( course ) ) {
      this.addedToCartMessage();
    } else {
      this.alreadyInCartMessage();
    }
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
      this.router.navigate(['/cart']);
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




}
