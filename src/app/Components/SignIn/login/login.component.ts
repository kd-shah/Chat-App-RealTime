import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from './model';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  googleService: any;
  errorMessage: string | null = null;

  googleUserToken!: string

  user!: SocialUser;
  showError: boolean | undefined;
  body: ExternalAuthDto[] = [];


  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private socialService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.socialService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      console.log(this.user);

      setTimeout(() => {
        this.externalLogin();
        this.router.navigate(['/dashboard']);
      }, 2000); 
    })

  }

  externalLogin = () => {
    console.log("API hit");
    this.showError = false;
    // this.auth.signInWithGoogle();
    this.auth.authChangeSub.next(true);
    this.auth.extAuthChangeSub.next(this.user);
    this.auth.extAuthChanged.subscribe((response : any) => {
      console.log("From backend", response)
      const externalAuth: ExternalAuthDto = {
        idToken: response.idToken
      }
      this.auth.storeToken(this.googleUserToken)
      console.log("Token for bearer", this.googleUserToken)
      this.auth.storeDetails(response.firstName, response.id)

      console.log(response.firstName, response.id)
      this.validateExternalAuth(externalAuth);


    })
  }


  private validateExternalAuth(externalAuth: ExternalAuthDto) {

    this.auth.externalLogin(externalAuth).subscribe(response => {
      this.googleUserToken = response;
      console.log("Tokennnnnnnnnnnnnnnnnnnnnnn", response)
    });
  }

  // private handleExternalLogin() {
  //   console.log("API hit");
  //   this.showError = false;

  //   // Subscribe to externalLogin and handle the response
  //   this.auth.extAuthChanged.pipe(
  //     tap((user : any) => {
  //       console.log("From backend", user);
  //       const externalAuth: ExternalAuthDto = {
  //         idToken: user.idToken
  //       };

  //       // Store the token and navigate to the dashboard
  //       this.validateExternalAuth(externalAuth).subscribe((response) => {
  //         this.googleUserToken = response;
  //         console.log("Tokennnnnnnnnnnnnnnnnnnnnnn", response);

  //         // Navigate to the dashboard here
  //         this.router.navigate(['/dashboard']);
  //       });
  //     })
  //   ).subscribe();
  // }

  // private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //   // Use the tap operator to log the response and then return it
  //   return this.auth.externalLogin(externalAuth).pipe(
  //     tap((response) => {
  //       console.log("Response from externalLogin:", response);
  //     })
  //   );
  // }


  onLogin() {
    if (this.loginForm.valid) {
      //send object to db
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Login response:', response);
            alert(response.message);
            this.auth.storeToken(response.userInfo.token)
            // console.log(response.userInfo.token)
            this.auth.storeDetails(response.userInfo.name, response.userInfo.userId)
            // console.log(response.userInfo.name, response.userInfo.userId)
            this.router.navigate(['/dashboard'])
            this.loginForm.reset();

          },
          error: (err) => {
            alert(err?.error.message)
          }
        })

    }
    else {
      //throw error
      console.log("form is not valid")
      this.validateForm(this.loginForm)
      alert("Your form is invalid")
    }
  }
  private validateForm(formgroup: FormGroup) {
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateForm(control)
      }
    });
  }
}
