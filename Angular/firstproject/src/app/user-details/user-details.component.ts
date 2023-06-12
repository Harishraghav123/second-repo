import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { test } from 'node:test';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  message: string = '';
  paramValue: string | undefined;
  showTemplate: boolean | undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  /**
  * This ngOnInit function is life hook. 
  * This hook is called once after the component. 
  */
  ngOnInit(): void {
    const paramValue = this.route.snapshot.paramMap.get('id');

    this.getData(paramValue);
   
    throw new Error('Error occur on UserDetailsComponent.');
  }

  getData(paramValue: any) {
    const url = 'http://127.0.0.1:8080/api/get-details/' + paramValue;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(url, { headers: headers })
    // here pipe function is used for changing the errors.
      .pipe(
        catchError(this.handleError)

      )
      .subscribe(response => {
        this.showTemplate = true;
        // Handle the successful response here
        this.message = response.response_message.message
      });
  }

  handleError(error: HttpErrorResponse) {

    if (error.status == 401) {
      this.showTemplate = false;
    }
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // You can customize the error handling logic here, such as displaying an error message to the user  
    return throwError(() => new Error(errorMessage));
  }

  /** This function is used for Logout the user & remove token from localstorage. */
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    this.router.navigate(['/login-form']);
  }
}
