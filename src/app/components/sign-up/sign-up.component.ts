import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form :FormGroup;
  email :string;
  password :string;
  passwordConfirmation :string;

  constructor( private router:Router,
                public authService:AuthService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      passwordConfirmation: new FormControl(null, Validators.required)
    }, { validators: this.passwordsDontMatch( 'password', 'passwordConfirmation' ) });
  }

  passwordsDontMatch( password :string, passwordConfirmation :string ) {
    return ( group :FormGroup ) => {
      let pass1 = group.controls[password].value;
      let pass2 = group.controls[passwordConfirmation].value;

      if ( pass1 === pass2 ) {
          return null;
      }
      return { passwordsDontMatch: true }
    }
  }


  onSignUpSubmit() {

    if ( !this.form.valid ) {
        console.log('Something went wrong.');
        console.log(this.form);
        return;
    }

    let user = new User (
      this.form.value.email,
      this.form.value.password,
      this.form.value.passwordConfirmation
    );

    this.authService.registerUser( user );

  }




}
