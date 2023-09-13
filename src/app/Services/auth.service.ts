import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './model';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Observable, Subject } from 'rxjs';
import { ExternalAuthDto } from '../Components/SignIn/login/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authChangeSub = new Subject<boolean>();
private extAuthChangeSub = new Subject<SocialUser>();
public authChanged = this.authChangeSub.asObservable();
public extAuthChanged = this.extAuthChangeSub.asObservable();

  private baseUrl: string = "https://localhost:7218/api/"
  
  
  constructor(private http: HttpClient, private externalAuthService: SocialAuthService) { 
    this.externalAuthService.authState.subscribe((user) => {
      console.log(user)
      this.extAuthChangeSub.next(user);
    })
  }

  signInWithGoogle = () => {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  externalLogin(googleUser: ExternalAuthDto): Observable<any> {
    return this.http.post<any>(`https://localhost:7218/api/User/GoogleAuthenticate`, googleUser);
  }
  
  register(userObj:RegisterRequest){
    return this.http.post<RegisterResponse>(`${this.baseUrl}register`, userObj)
  }

    login(loginObj: LoginRequest){
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, loginObj)
  }

  isLoggedIn(): boolean{
    const token = this.getToken();
    return !!token;
  }

  storeToken(token : string){
    localStorage.setItem('auth-token', token)
  }

  getToken() : string | null{
    return localStorage.getItem('auth-token')
  }

  storeDetails(name: string, id: string){
    localStorage.setItem('user-name', name )
    localStorage.setItem('user-id', id )
  }

  getName() : string | null{
    return localStorage.getItem('user-name')
  }

  getUserId() : string | null{
    return localStorage.getItem('user-id')
  }

  removetoken() {
    return localStorage.removeItem('auth-token')
  }

}
