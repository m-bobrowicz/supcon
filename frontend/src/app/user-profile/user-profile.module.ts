import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

@NgModule({
  exports: [UserProfileComponent],
  declarations: [UserProfileComponent],
  imports: [CommonModule],
})
export class UserProfileModule {}
