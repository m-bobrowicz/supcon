import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/user/user';

@Component({
  selector: 'sc-user-info',
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Input() user: User | null = null;
}
