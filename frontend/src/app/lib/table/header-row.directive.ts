import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scHeaderRow]' })
export class HeaderRowDirective {
  @HostBinding('class')
  readonly elementClass = '';
}
