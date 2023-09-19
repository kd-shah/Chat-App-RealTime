import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "https://localhost:7218/api/"
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`)
  }

  getUnReadMessages(){
    return this.http.get<any>(`${this.baseUrl}messages/unread`)
  }

  readMessages(array : number[]){
    return this.http.put<any>(`${this.baseUrl}messages/read`, array)
  }
}
