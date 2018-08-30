import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { URL_SERVER } from '../config/config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

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

  sendPaymentConfirmed( payment :any, data :any, cartItems :Course[] ) {
    // Send Data to the server
    console.log(payment);
    console.log(cartItems);
    let url = URL_SERVER + '/payments';
    console.log(url);
    return this.http.post( url, { payment, data, cartItems }, { headers: this.headers })
            .pipe( map( (res :any) => {
              console.log(res);
              return res;
            }))
  }




}
