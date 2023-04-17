import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConduitDefiniton } from 'src/app/conduit-definition/conduit-definition';
import { InputSchema } from 'src/app/input-schema/input-schema';

@Injectable({ providedIn: 'root' })
export class ConduitDefinitionService {
  getById(id: string): Observable<ConduitDefiniton> {
    return this.http.get<ConduitDefiniton>(`/api/conduit-definition/${id}`);
  }

  getSchemaById(id: string): Observable<InputSchema> {
    return this.http.get<InputSchema>(`/api/conduit-definition/${id}/schema`);
  }

  refreshSchema(id: string) {
    return this.http.post(`/api/conduit-definition/${id}/schema-refresh`, {});
  }

  constructor(private http: HttpClient) {}
}
