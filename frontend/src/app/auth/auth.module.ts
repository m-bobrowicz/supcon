import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { SignInModule } from 'src/app/auth/sign-in/sign-in.module';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'sign-in', component: SignInComponent }]),
    SignInModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthModule {}
