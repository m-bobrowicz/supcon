import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'sc-auth-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  formGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.resetForm();
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value as {
      username: string;
      password: string;
    };
    this.auth
      .signIn(value)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        }),
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === HttpStatusCode.Unauthorized
          ) {
            this.formGroup.setErrors({ wrongCredentials: true });
          }
          throw error;
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.formGroup.setErrors(null);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
}
