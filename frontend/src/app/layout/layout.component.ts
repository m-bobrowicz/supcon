import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  signOut() {
    this.auth
      .signOut()
      .pipe(tap(() => this.router.navigateByUrl('/auth/sign-in')))
      .subscribe();
  }

  constructor(private auth: AuthService, private router: Router) {}
}
