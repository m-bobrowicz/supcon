import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ConduitDefinitionEditComponent } from 'src/app/conduit-definition-edit/conduit-definition-edit.component';
import { InputModule } from 'src/app/lib/input/input.module';
import { IconsModule } from 'src/app/lib/icon/icon.module';

@NgModule({
  exports: [ConduitDefinitionEditComponent],
  declarations: [ConduitDefinitionEditComponent],
  imports: [CommonModule, InputModule, CdkTreeModule, IconsModule],
})
export class ConduitDefinitionEditModule {}
