import { Component, Renderer2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { UserFaceConfigDataServiceService } from 'src/app/services/user-face-config-data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  email: string = "";
  password: string = "";

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrlForAdmin: string = "admin/home";
  returnUrlForUser: string = "user/home";

  registration: boolean = false;
  errorMessage: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2,
    private userFaceConfigService: UserFaceConfigDataServiceService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/test']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', this.registration ? Validators.required : null],
      email: ['', this.registration ? Validators.required : null],
      firstname: ['', this.registration ? Validators.required : null],
      lastname: ['', this.registration ? Validators.required : null]
    });
  }

  ngOnInit() {
    debugger;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', this.registration ? Validators.required : null],
      email: ['', this.registration ? Validators.required : null],
      firstname: ['', this.registration ? Validators.required : null],
      lastname: ['', this.registration ? Validators.required : null]
    });
    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    if (!this.registration) {
      this.authenticationService.login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (data) => {
            this.setLocaleStorageIsUserFaceConfigSet().pipe(tap(res => {
              localStorage.setItem('isUserFaceConfigSet', JSON.stringify(res));
            })).subscribe({
              next:() => {debugger;this.redirect();}
            });
           
          },
          error: (err) => {
            debugger; this.errorMessage = err['error'];
            this.loading = false;
          },
        })
    } else {
      this.authenticationService.register(this.loginForm.value)
        .subscribe({
          next: (data) => {
            debugger;
            this.registration = false;
          },
          error: (err) => {
            debugger;
            this.errorMessage = err["error"];
            this.loading = false;
          }
        });
    }
  }

  redirect() {
    if (this.authenticationService.isCurrentUserAdmin()) {
      this.router.navigate([this.returnUrlForAdmin]);
    } else {
      this.router.navigate([this.returnUrlForUser]);
    }
  }

  register() {
    this.registration = true;
  }

  login() {
    this.registration = false;
  }

  setLocaleStorageIsUserFaceConfigSet() {
    return this.userFaceConfigService.isUserFaceConfigSet();
   
  }
}



