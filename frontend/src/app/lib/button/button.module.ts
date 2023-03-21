import { NgModule } from '@angular/core';
import { ButtonLinkDirective } from 'src/app/lib/button/button-link.directive';
import { ButtonPrimaryDirective } from 'src/app/lib/button/button.directive';

@NgModule({
  exports: [ButtonPrimaryDirective, ButtonLinkDirective],
  declarations: [ButtonPrimaryDirective, ButtonLinkDirective],
  imports: [],
})
export class ButtonModule {}
