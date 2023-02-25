import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { UserProfileModule } from 'src/app/user-profile/user-profile.module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'app',
        component: LayoutComponent,
        children: [
          {
            path: 'user-profile',
            component: UserProfileComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('src/app/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
      },
    ]),
    LayoutModule,
    UserProfileModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
