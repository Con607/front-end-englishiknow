import { Injectable } from '@angular/core';

import {Subject, Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { URL_SERVER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor( private http:HttpClient ) {

    // this.tokenService.validateToken()
    //       .subscribe( res => {
    //         res == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false);
    //       })
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


  logInUser( login:string, password:string ){

    // return this.tokenService.signIn({ login, password })
    //       .pipe(map ( res => {
    //         this.userSignedIn$.next(true);
    //         return res;
    //       }))
  }



}
