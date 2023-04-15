import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scMenu]' })
export class MenuDirective {
  @HostBinding('class')
  readonly elementClass =
    'flex flex-col inline-flex mt-2';
}
