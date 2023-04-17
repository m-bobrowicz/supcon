import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConduitDefinitionListStore } from 'src/app/conduit-definition-list/conduit-definition-list-store.service';

@Component({
  selector: 'sc-conduit-definition-list',
  templateUrl: './conduit-definition-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConduitDefinitionListStore],
})
export class ConduitDefinitionListComponent {
  readonly displayedColumns = ['name', 'createdAt', 'actions'];
  dataSource = this.store.items$;

  ngOnInit() {
    this.store.loadPage();
  }

  constructor(public store: ConduitDefinitionListStore) {}
}
