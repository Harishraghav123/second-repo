import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  username: string | undefined;
  password: string | undefined;

  message: string | undefined
  constructor(private http: HttpClient,
    private router: Router) { }

  /** This function call login api. */

  login(formdata: any) {
    const url = 'http://127.0.0.1:8080/api/login';

    this.http.post(url, { username: formdata.username, password: formdata.password }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('API Error:', error);

        if (error) {
          this.message = error.error.response_message.message
        }

        return throwError(() => new Error('Something went wrong; please try again later.'));

      })).subscribe(response => {
        // Handle the successful response here
        var response_message = (JSON.parse(JSON.stringify(response))).response_message;

        if (response_message.status_code == "200") {

          localStorage.setItem('token', response_message.token)
          localStorage.setItem('uid', response_message.message)
          this.router.navigate(['/user-details', response_message.message]);

        } else {
          // this.message = response_message.message
        }
      });
  }

}
