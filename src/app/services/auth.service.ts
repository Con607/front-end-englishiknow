import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/internal/operators/map';
import { URL_SERVER } from '../config/config';
import { User } from '../models/user';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser :User;
  token :string;



  constructor( private http:HttpClient,
                private router:Router ) {

    this.loadStorage();
  }



  loadStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.currentUser = null;
    }
  }


  isLoggedIn() {
    return ( this.token.length > 5 ) ? true : false;
  }


  logInUser( user :User ){
    let url = URL_SERVER + '/users/sign_in';

    return this.http.post( url, { user: {email: user.email, password: user.password}}, {observe: 'response'} )
          .subscribe( (res :any) => {
            console.log('Succesfully signed in.');
            this.setInLocalStorage( res.headers.get('Authorization'), res.body );
            this.successfulSignIn();
            return true;
        }, error => {
          console.log(error);
          this.invalidCredentials();
        })
  }


  setInLocalStorage( token :string, user :User ) {
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'user', JSON.stringify( user ) );
    this.loadStorage();
  }


  registerUser( user :User ) {
    let url = URL_SERVER + '/users';

    // console.log('Im inside registerUser()');
    // console.log(user);

    return this.http.post( url, { user: user }, {observe: 'response'} )
            .subscribe( (res :any) => {
              console.log('User created succesfully.');
              this.setInLocalStorage( res.headers.get('Authorization'), res.body );
              this.successfulSignUp();
              return true;
            }, error => {
              console.log(error);
              if (error.status == 422) {
                console.log(error.error.errors);
                this.error422( this.formatErrorMessage(error.error.errors) );
              } else {
                this.somethingWentWrong();
              }

            })
  }



  logOutUser(){
    this.token = '';
    this.currentUser = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/sign-in']);
  }



  // Loop through errors and concatenate them in a string to display to the user.
  formatErrorMessage( error :any ):string {
    let formattedError :string = '';

    for ( let key in error ) {
        formattedError = formattedError + key + ' ' + error[key] + '\n';
    }

    return formattedError;
  }



  // Sweet Alert Messages
  successfulSignIn() {
    swal({
      title: 'Succesfully signed in!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/dashboard']);
    });
  }

  invalidCredentials() {
    swal({
      title: 'Invalid credentials',
      text: 'Please try again.',
      type: 'error'
    })
  }

  successfulSignUp() {
    swal({
      title: 'Succesfully registered!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['/dashboard']);
    });
  }

  error422( error ) {
    swal({
      title: 'Something went wrong.',
      text: 'Error: ' + error,
      type: 'warning'
    })
  }

  somethingWentWrong() {
    swal({
      title: 'Something went wrong',
      text: 'Please try again.',
      type: 'error'
    })
  }



}
