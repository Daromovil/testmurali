import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCmdInput, LoginCmdOutput } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {    
  currentUser = {};

  constructor(private httpClient: HttpClient) { }
   
  authenticate(login: LoginCmdInput): Observable<LoginCmdOutput> {
    
    return this.httpClient.post<LoginCmdOutput>('LoginApi', login);      
  }


  getAccessToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('jwtToken');
    return (authToken !== null) ? true : false;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');    
  }

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  
}
