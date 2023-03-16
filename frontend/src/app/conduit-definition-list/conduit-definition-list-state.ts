import { ConduitDefiniton } from 'src/app/conduit-definition/conduit-definition';

export interface ConduitDefinitionListState {
  totalCount: number;
  items: ConduitDefiniton[];
  page: number;
  limit: number;
}

export const defaultConduitDefinitionListState: ConduitDefinitionListState = {
  totalCount: 0,
  items: [],
  page: 1,
  limit: 10,
};
