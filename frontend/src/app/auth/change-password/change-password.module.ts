import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [],
  declarations: [ChangePasswordComponent],
  providers: [],
})
export class ChangePasswordModule {}

