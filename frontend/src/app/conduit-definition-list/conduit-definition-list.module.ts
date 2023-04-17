import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { ConduitDefinitionListComponent } from 'src/app/conduit-definition-list/conduit-definition-list.component';
import { TableModule } from 'src/app/lib/table/table.module';
import { PaginatorModule } from 'src/app/lib/paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatModule } from 'src/app/lib/date-format/date-format.module';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'src/app/lib/button/button.module';

@NgModule({
  exports: [ConduitDefinitionListComponent],
  declarations: [ConduitDefinitionListComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CdkTableModule,
    TranslateModule,
    TableModule,
    PaginatorModule,
    DateFormatModule,
  ],
})
export class ConduitDefinitionListModule {}
