import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
