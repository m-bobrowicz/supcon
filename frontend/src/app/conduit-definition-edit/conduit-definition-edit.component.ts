import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  finalize,
  map,
  merge,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ConduitDefinitionService } from 'src/app/conduit-definition/conduit-definition.service';
import { InputSchemaNode } from 'src/app/input-schema/input-schema-node';

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

  treeControl = new NestedTreeControl<InputSchemaNode>((node) => node.children);
  isReloadingInputSchema$ = new BehaviorSubject(false);
  reloadInputSchema$ = new Subject<void>();
  inputSchema$ = merge([this.id$, this.reloadInputSchema$]).pipe(
    switchMap(() => this.id$),
    switchMap((id) => this.conduitDefinitionService.getSchemaById(id as string))
  );
  hasChild = (_: number, node: InputSchemaNode) =>
    !!node.children && node.children.length > 0;

  refreshInputSchema() {
    this.isReloadingInputSchema$.next(true);
    this.id$
      .pipe(
        switchMap((id) =>
          this.conduitDefinitionService.refreshSchema(id as string).pipe(
            finalize(() => {
              this.reloadInputSchema$.next();
              this.isReloadingInputSchema$.next(false);
            })
          )
        )
      )
      .subscribe();
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private conduitDefinitionService: ConduitDefinitionService
  ) {}
}
