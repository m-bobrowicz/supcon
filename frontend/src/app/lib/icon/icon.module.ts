import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { LogOut, ChevronLeft, ChevronRight, User } from 'angular-feather/icons';

@NgModule({
  imports: [
    FeatherModule.pick({
      LogOut,
      ChevronLeft,
      ChevronRight,
      User,
    }),
  ],
  exports: [FeatherModule],
})
export class IconsModule {}
