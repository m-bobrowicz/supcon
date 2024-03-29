import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
  RefreshCcw,
} from 'angular-feather/icons';

@NgModule({
  imports: [
    FeatherModule.pick({
      LogOut,
      ChevronLeft,
      ChevronRight,
      ChevronDown,
      ChevronUp,
      User,
      RefreshCcw,
    }),
  ],
  exports: [FeatherModule],
})
export class IconsModule {}
