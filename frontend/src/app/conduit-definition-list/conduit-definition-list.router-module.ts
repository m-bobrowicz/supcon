import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConduitDefinitionListComponent } from 'src/app/conduit-definition-list/conduit-definition-list.component';
import { ConduitDefinitionListModule } from 'src/app/conduit-definition-list/conduit-definition-list.module';

@NgModule({
  imports: [
    ConduitDefinitionListModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConduitDefinitionListComponent,
      },
    ]),
  ],
})
export class ConduitDefinitionListRouterModule {}
