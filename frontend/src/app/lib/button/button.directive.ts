import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scButtonPrimary]' })
export class ButtonPrimaryDirective {
  @HostBinding('class')
  readonly elementClass =
    'border-2 border-transparent rounded p-2 text-white outline-none bg-indigo-700';
}
