import { NgModule } from '@angular/core';
import { MenuDirective, } from 'src/app/lib/menu/menu.directive';
import { MenuItemDirective } from 'src/app/lib/menu/menu-item.directive';

@NgModule({
  exports: [MenuDirective, MenuItemDirective],
  declarations: [MenuDirective, MenuItemDirective],
  imports: [],
})
export class MenuModule {}
