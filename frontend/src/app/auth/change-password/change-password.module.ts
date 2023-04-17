import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ButtonModule } from 'src/app/lib/button/button.module';
import { InputModule } from 'src/app/lib/input/input.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputModule],
  exports: [],
  declarations: [ChangePasswordComponent],
  providers: [],
})
export class ChangePasswordModule {}
