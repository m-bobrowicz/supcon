import { NgModule } from '@angular/core';
import { InputDirective } from 'src/app/lib/input/input.directive';

@NgModule({
  exports: [InputDirective],
  declarations: [InputDirective],
})
export class InputModule {}
