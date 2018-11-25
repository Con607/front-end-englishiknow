import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html'
})
export class Login2Component {

  form :FormGroup;
  email :string;
  password :string;

  loginform = true;
  recoverform = false;

  constructor( private router:Router,
                public authService:AuthService ) {}


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
      // passwordConfirmation: new FormControl(null, Validators.required)
    });
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
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

    this.authService.logInUser( user );

  }


}
