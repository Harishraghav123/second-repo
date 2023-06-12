import { Component} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-customcomponent2',
  templateUrl: './customcomponent2.component.html',
  styleUrls: ['./customcomponent2.component.css']
})
export class Customcomponent2Component {
  message: string = '';

  constructor(private http: HttpClient,
    private router: Router) { }

  //This is function is used redirect on other page.
  getData() {
    this.router.navigate(['/Custom-component-Component']);
  }

  formData: { name: string, email: string, password: string, check: string, file: string } = { name: "", email: "", password: "", check: "", file: "" };

  //This is function is used for insert data into database using POST API.
  getuserformdata(formdata: any) {

    const url = 'http://127.0.0.1:8080/api/register';
    const data = { name: formdata.name, email: formdata.email, password: formdata.password };

    if (formdata.name === '') {
      this.message ="Name is required"
      var myDiv = document.getElementById('msg-div');
      if (myDiv !== null) {
        // Remove a class
        myDiv.classList.remove('text-success');

        // Add a new class
        myDiv.classList.add('text-danger');

      } else {
        console.error("Element with ID 'myDiv' not found");
      }
      return
    }

    this.http.post(url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('API Error:', error);
        var response_message = (JSON.parse(JSON.stringify(error)));
        this.message = response_message.error.response_message.message

        var myDiv = document.getElementById('msg-div');
        if (myDiv !== null) {
          // Remove a class
          myDiv.classList.remove('text-success');

          // Add a new class
          myDiv.classList.add('text-danger');

        } else {
          console.error("Element with ID 'myDiv' not found");
        }
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })

    ).subscribe(response => {
      // Handle the successful response here
      var response_message = (JSON.parse(JSON.stringify(response))).response_message;
      if (response_message.status_code == "200") {


        var myDiv = document.getElementById('msg-div');

        if (myDiv !== null) {
          // Remove a class
          myDiv.classList.remove('text-danger');

          // Add a new class
          myDiv.classList.add('text-success');

        } else {
          console.error("Element with ID 'msg-div' not found");
        }

        this.message = response_message.message
      } else {
        this.message = response_message.message
      }
    });
    

  }
}
