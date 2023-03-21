import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'sc-auth-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  formGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  submit() {
    this.resetForm();
    this.formGroup.markAllAsTouched();

    const value = this.formGroup.value as {
      currentPassword: string;
      newPassword: string;
      repeatPassword: string;
    };

    if (this.formGroup.invalid || value.newPassword != value.repeatPassword)
      return;

    this.auth
      .whoAmI()
      .pipe(
        switchMap((user) => {
          return this.auth
            .changePassword({ ...value, username: user.username })
            .pipe(
              tap(() => this.auth.signIn({username: user.username, password: value.newPassword})),
              tap(() => this.router.navigateByUrl('app/user-profile')),
              catchError((error) => {
                if (
                  error instanceof HttpErrorResponse &&
                  error.status === HttpStatusCode.Unauthorized
                ) {
                  this.formGroup.setErrors({ wrongCredentials: true });
                }
                throw error;
              })
            );
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
