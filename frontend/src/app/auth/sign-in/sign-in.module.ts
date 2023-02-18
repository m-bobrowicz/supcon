import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [],
  declarations: [SignInComponent],
  providers: [],
})
export class SignInModule {}
