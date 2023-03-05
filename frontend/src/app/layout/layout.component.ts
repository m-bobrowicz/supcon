import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {


  signOut(){
    this.auth.signOut().pipe(
      tap(() => this.router.navigateByUrl('/auth/sign-in'))
    ).subscribe()
  }

  constructor(private auth: AuthService, private router: Router){}

}
