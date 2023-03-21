import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { UserProfileModule } from 'src/app/user-profile/user-profile.module';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ChangePasswordModule } from './auth/change-password/change-password.module';

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
          {
            path: 'conduit-definition',
            loadChildren: () =>
              import(
                'src/app/conduit-definition-list/conduit-definition-list.router-module'
              ).then((m) => m.ConduitDefinitionListRouterModule),
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'app/change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('src/app/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '',
        redirectTo: 'app/conduit-definition',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'app/conduit-definition',
      },
    ]),
    LayoutModule,
    UserProfileModule,
    ChangePasswordModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
