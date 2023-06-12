import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customcomponent',
  templateUrl: './customcomponent.component.html',
  styleUrls: ['./customcomponent.component.css']
})
export class CustomcomponentComponent implements OnInit {

  message: string = '';

  constructor(private http: HttpClient,
    private router: Router) { }

  /**
    * This ngOnInit function is life hook. 
    * This hook is called once after the component. 
    */
  ngOnInit(): void {
    this.getData();
    throw new Error('Method not implemented.');
  }

  //This getData function is used for getdata from API. 
  getData() {
    this.http.get<any[]>('http://127.0.0.1:8080/api/get-details').subscribe(response => {
      // Handle the successful response here
      this.message =  (JSON.stringify(response));
    });
  }

}
