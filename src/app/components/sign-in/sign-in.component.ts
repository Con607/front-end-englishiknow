import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AngularTokenService } from 'angular-token';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  form :FormGroup;
  email :string;
  password :string;

  constructor( private tokenService:AngularTokenService,
                private router:Router ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }


  onSignInSubmit() {

    if ( !this.form.valid ) {
        console.log('Something went wrong.');
        console.log(this.form);
        return;
    }

    let signInUser = {
      login: this.form.value.email,
      password: this.form.value.password
    }

    this.tokenService.signIn( signInUser )
        .subscribe( res => {
          if ( res.status == 200 ) {
            console.log('Succesfully signed in.');
            this.successfulSignIn();
          }
        }, error => {
          console.log(error);
        });

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


}
