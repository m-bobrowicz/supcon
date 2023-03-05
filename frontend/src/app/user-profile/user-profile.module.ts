import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserInfoComponent } from 'src/app/user-profile/user-info/user-info.component';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

@NgModule({
  exports: [UserProfileComponent],
  declarations: [UserProfileComponent, UserInfoComponent],
  imports: [CommonModule],
})
export class UserProfileModule {}
