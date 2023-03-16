import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { LogOut, ChevronLeft, ChevronRight } from 'angular-feather/icons';

@NgModule({
  imports: [
    FeatherModule.pick({
      LogOut,
      ChevronLeft,
      ChevronRight,
    }),
  ],
  exports: [FeatherModule],
})
export class IconsModule {}
