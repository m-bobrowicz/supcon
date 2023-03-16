import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scRow]' })
export class RowDirective {
  @HostBinding('class')
  readonly elementClass = '';
}
