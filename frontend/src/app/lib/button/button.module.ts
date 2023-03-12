import { NgModule } from '@angular/core';
import { ButtonPrimaryDirective } from 'src/app/lib/button/button.directive';

@NgModule({
  exports: [ButtonPrimaryDirective],
  declarations: [ButtonPrimaryDirective],
  imports: [],
})
export class ButtonModule {}
