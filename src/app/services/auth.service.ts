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

  userToken :string;

  constructor( private http:HttpClient,
                private router:Router ) {

    // this.tokenService.validateToken()
    //       .subscribe( res => {
    //         res == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false);
    //       })
  }


  logInUser( user :User ){
    let url = URL_SERVER + '/users/sign_in';

    // console.log(url);
    // console.log(user);

    return this.http.post( url, { user: {email: user.email, password: user.password}}, {observe: 'response'} )
          .subscribe( (res :any) => {
            console.log('Succesfully signed in.');
            this.userToken = res.headers.get('Authorization');
            this.successfulSignIn();
            return res;
        }, error => {
          console.log(error);
          this.invalidCredentials();
        })
  }


  logOutUser(){
    // let url = URL_SERVER + '/auth/sign_out';
    // let headers = this.tokenService.currentAuthData
    // console.log(localStorage);
    //
    // // return this.http.delete( url, {headers} )
    // //       .pipe( map( res => {
    // //         return res;
    // //       }))

  }


  registerUser( login:string, password:string, passwordConfirmation:string ) {
    // return this.tokenService.registerAccount({ login, password })
    //       .pipe( map( res => {
    //         this.userSignedIn$.next(true);
    //         return res;
    //       }))
  }


  // Sweet Alert Messages
  successfulSignIn() {
    swal({
      title: 'Succesfully signed in!',
      type: 'success'
    }).then((result) => {
      this.router.navigate(['courses']);
    });
  }

  invalidCredentials() {
    swal({
      title: 'Invalid credentials',
      text: 'Please try again.',
      type: 'error'
    })
  }



}
