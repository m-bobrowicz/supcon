import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  ConduitDefinitionListState,
  defaultConduitDefinitionListState,
} from 'src/app/conduit-definition-list/conduit-definition-list-state';
import { ConduitDefinitionListService } from 'src/app/conduit-definition-list/conduit-definition-list.service';

@Injectable()
export class ConduitDefinitionListStore extends ComponentStore<ConduitDefinitionListState> {
  items$ = this.select((state) => state.items);
  totalCount$ = this.select((state) => state.totalCount);
  page$ = this.select((state) => state.page);
  limit$ = this.select((state) => state.limit);

  loadPage = this.effect((loadPage$) =>
    loadPage$.pipe(
      withLatestFrom(this.page$, this.limit$),
      switchMap(([, page, limit]) =>
        this.conduitDefinitionListService
          .list({
            page,
            limit,
          })
          .pipe(
            tap((result) => {
              this.patchState({
                totalCount: result.count,
                items: result.items,
              });
            })
          )
      )
    )
  );

  pageChange = this.effect((pageChange$: Observable<{ page: number }>) =>
    pageChange$.pipe(
      tap(({ page }) => {
        this.patchState({ page });
        this.loadPage();
      })
    )
  );

  constructor(
    private conduitDefinitionListService: ConduitDefinitionListService
  ) {
    super(defaultConduitDefinitionListState);
  }
}
