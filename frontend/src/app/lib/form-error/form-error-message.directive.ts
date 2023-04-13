import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({ selector: '[scFormErrorMessage]' })
export class FormErrorDirective {
  @HostBinding('class.hidden')
  get isHidden() {
    if (this.checkFor == null) {
      return false === (this.control?.touched && this.control?.invalid);
    }
    return (
      false === this.control?.touched &&
      false === this.control?.hasError(this.checkFor)
    );
  }

  @HostBinding('class.text-red-500')
  textClass = true;

  @Input('scFormErrorMessage') control: AbstractControl | null = null;

  @Input('scFormErrorMessageCheckFor') checkFor: string | null = null;
}
