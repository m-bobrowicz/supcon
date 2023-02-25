import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sc-user-profile',
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {}
