import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { ButtonModule } from 'src/app/lib/button/button.module';
import { FormErrorModule } from 'src/app/lib/form-error/form-error.module';
import { InputModule } from 'src/app/lib/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputModule,
    FormErrorModule,
  ],
  exports: [],
  declarations: [SignInComponent],
  providers: [],
})
export class SignInModule {}
