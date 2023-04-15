import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[scMenuItem]' })
export class MenuItemDirective {
  @HostBinding('class')
  readonly elementClass =
    'flex items-center bg-zinc-700 flex-row flex-1 font-semibold  pr-7 pb-2 pt-2 pl-2 border-2 border-spacing-y-1.5 border-zinc-200 hover:border-indigo-700 hover:shadow-indigo-800 rounded-lg shadow-md shadow-zinc-800 text-sm';
}
