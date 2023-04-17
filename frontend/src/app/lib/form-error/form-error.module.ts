import { NgModule } from '@angular/core';
import { FormErrorBorderDirective } from 'src/app/lib/form-error/form-error-border.directive';
import { FormErrorDirective } from 'src/app/lib/form-error/form-error-message.directive';

@NgModule({
  exports: [FormErrorDirective, FormErrorBorderDirective],
  declarations: [FormErrorDirective, FormErrorBorderDirective],
  imports: [],
})
export class FormErrorModule {}
