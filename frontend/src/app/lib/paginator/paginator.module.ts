import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { ButtonModule } from 'src/app/lib/button/button.module';
import { PaginatorComponent } from 'src/app/lib/paginator/paginator.component';

@NgModule({
  exports: [PaginatorComponent],
  declarations: [PaginatorComponent],
  imports: [CommonModule, TranslateModule, FeatherModule, ButtonModule],
})
export class PaginatorModule {}
