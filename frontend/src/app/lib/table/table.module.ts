import { NgModule } from '@angular/core';
import { CellDirective } from 'src/app/lib/table/cell.directive';
import { HeaderCellDirective } from 'src/app/lib/table/header-cell.directive';
import { HeaderRowDirective } from 'src/app/lib/table/header-row.directive';
import { RowDirective } from 'src/app/lib/table/row.directive';
import { TableContainerDirective } from 'src/app/lib/table/table-container.directive';
import { TableDirective } from 'src/app/lib/table/table.directive';

@NgModule({
  exports: [
    TableContainerDirective,
    TableDirective,
    HeaderRowDirective,
    RowDirective,
    HeaderCellDirective,
    CellDirective,
  ],
  declarations: [
    TableContainerDirective,
    TableDirective,
    HeaderRowDirective,
    RowDirective,
    HeaderCellDirective,
    CellDirective,
  ],
})
export class TableModule {}
