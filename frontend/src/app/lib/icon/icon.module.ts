import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { LogOut } from 'angular-feather/icons';

@NgModule({
  imports: [
    FeatherModule.pick({
      LogOut,
    }),
  ],
  exports: [FeatherModule],
})
export class IconsModule {}
