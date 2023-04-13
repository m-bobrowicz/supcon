import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConduitDefinitionEditComponent } from 'src/app/conduit-definition-edit/conduit-definition-edit.component';

@NgModule({
  exports: [ConduitDefinitionEditComponent],
  declarations: [ConduitDefinitionEditComponent],
  imports: [CommonModule],
})
export class ConduitDefinitionEditModule {}
