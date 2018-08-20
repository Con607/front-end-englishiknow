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
  // passwordConfirmation :string;

  constructor( private router:Router,
                public authService:AuthService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
      // passwordConfirmation: new FormControl(null, Validators.required)
    });
  }


  onSignInSubmit() {

    if ( !this.form.valid ) {
        console.log('Something went wrong.');
        console.log(this.form);
        return;
    }

    let user = new User (
      this.form.value.email,
      this.form.value.password
    );

    // console.log(this.form.value.email);

    this.authService.logInUser( user );

  }



  


}
