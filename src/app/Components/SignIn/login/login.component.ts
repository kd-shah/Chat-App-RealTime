import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from './model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm! : FormGroup
  googleService: any;
  errorMessage: string | null = null;

  user?: SocialUser;
  showError: boolean | undefined;
  body: ExternalAuthDto[] = [];

  
  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required ],
     password: ['',Validators.required ]
    })
    

    this.externalLogin();
  }

  externalLogin = () => {
    this.showError = false;
    this.auth.signInWithGoogle();
    this.auth.extAuthChanged.subscribe(user => {
      const externalAuth: ExternalAuthDto = {
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    })
  }


  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.auth.externalLogin(externalAuth).subscribe({
      next: (res : any) => {
        localStorage.setItem("token", res.token);
        // console.log('res', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      //send object to db
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(response)=>{
          console.log('Login response:', response); 
          alert(response.message);
          this.auth.storeToken(response.userInfo.token)
          console.log(response.userInfo.token)
          this.auth.storeDetails(response.userInfo.name, response.userInfo.userId)
          console.log(response.userInfo.name, response.userInfo.userId)
          this.router.navigate(['/dashboard'])
         this.loginForm.reset();
         
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
      
    }
    else{
      //throw error
      console.log("form is not valid")
      this.validateForm(this.loginForm)
      alert("Your form is invalid")
    }
  }
  private validateForm(formgroup: FormGroup){
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateForm(control)
      }
    });
  }
}
