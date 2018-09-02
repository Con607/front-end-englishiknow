import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { PaypalPayment } from '../models/paypal-payment.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  headers;
  courses :Course[] = [];
  cartItems :Course[] = [];

  constructor( private http:HttpClient,
                private router:Router,
                private authService:AuthService ) {

    this.headers = {
      'Content-Type':  'application/json',
      'Authorization': this.authService.getToken()
    }

    if ( localStorage.getItem( 'cartItems') ) {
      this.cartItems = JSON.parse( localStorage.getItem( 'cartItems') );
    }
    // console.log(this.cartItems);
  }


  isLoggedIn() {
    if ( !this.authService.isLoggedIn() ) {
      this.router.navigate(['/sign-in']);
    }
    return true;
  }


  addToCart( course :Course ) {
    console.log(course);
    if(this.cartItems.indexOf( course ) !== -1) {
      console.log('Course already exists!');
      return false;
    } else {
      if ( localStorage.getItem("cartItems") ) {
          this.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }

      this.cartItems.push( course );
      localStorage.setItem("cartItems", JSON.stringify( this.cartItems ));
      return true;
    }
  }


  getCartItemsCount(): number {
    return this.cartItems.length;
  }


  getCartItems(): Observable<any> {
    return of(this.cartItems);
  }

  clearCartItems() {
    this.cartItems = [];
  }

  sendPaymentConfirmed( paypal_payment :PaypalPayment, course_ids :number[] ) {
    console.log(paypal_payment);
    console.log(this.headers);

    // Send Data to the server
    let url = URL_SERVER + '/paypal_payments';
    console.log(url);
    return this.http.post( url, { "paypal_payment": paypal_payment }, { headers: this.headers })
            .pipe( map( (res :any) => {
              console.log(res);
              return res;
            }))
  }

  sendPayedCourses( course_ids :number[], paypal_payment_id :number ) {
    let url = URL_SERVER + '/paypal_payments/' + paypal_payment_id + '/assign_courses';
    return this.http.post( url, { "course_ids": course_ids, "paypal_payment_id": paypal_payment_id }, { headers: this.headers })
            .pipe( map( (res :any) => {
              return res;
            }))
  }




}
