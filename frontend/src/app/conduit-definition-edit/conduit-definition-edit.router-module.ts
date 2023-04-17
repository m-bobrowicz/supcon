import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConduitDefinitionEditComponent } from 'src/app/conduit-definition-edit/conduit-definition-edit.component';
import { ConduitDefinitionEditModule } from 'src/app/conduit-definition-edit/conduit-definition-edit.module';

@NgModule({
  imports: [
    ConduitDefinitionEditModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConduitDefinitionEditComponent,
      },
    ]),
  ],
})
export class ConduitDefinitionEditRouterModule {}
