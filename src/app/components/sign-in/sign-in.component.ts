import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {

  form :FormGroup;
  email :string;
  password :string;

  constructor( private router:Router,
                public authService:AuthService ) { }

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

    let signInData = {
      'login': this.form.value.email,
      'password': this.form.value.password
    }

    // this.authService.logInUser( login, password )
    //     .subscribe( res => {
    //       if ( res.status == 200 ) {
    //         console.log('Succesfully signed in.');
    //         this.successfulSignIn();
    //       }
    //     }, error => {
    //       console.log(error);
    //       this.invalidCredentials();
    //     });

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
