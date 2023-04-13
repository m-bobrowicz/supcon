import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ConduitDefinitionService } from 'src/app/conduit-definition/conduit-definition.service';

@Component({
  selector: 'sc-conduit-definition-edit',
  templateUrl: './conduit-definition-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConduitDefinitionEditComponent {
  id$ = this.activatedRoute.paramMap.pipe(map((params) => params.get('id')));

  conduitDefinition$ = this.id$.pipe(
    switchMap((id) => this.conduitDefinitionService.getById(id as string))
  );
  inputSchema$ = this.id$.pipe(
    switchMap((id) => this.conduitDefinitionService.getSchemaById(id as string))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private conduitDefinitionService: ConduitDefinitionService
  ) {}
}
