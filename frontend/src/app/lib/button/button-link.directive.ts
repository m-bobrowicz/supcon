import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scButtonLink]' })
export class ButtonLinkDirective {
  @HostBinding('class')
  readonly elementClass =
    'border-0 p-0 text-white outline-none leading-none disabled:opacity-50 disabled:cursor-not-allowed';
}
