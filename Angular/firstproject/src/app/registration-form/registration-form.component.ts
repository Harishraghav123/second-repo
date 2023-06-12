import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  registrationForm: any;

  get username() {
    return this.registrationForm.controls.username;
  }

  get email() {
    return this.registrationForm.controls.email;
  }

  get password() {
    return this.registrationForm.controls.password;
  }

  registerUser() {
    // Perform registration logic here
    console.log(this.user);
  }
}
