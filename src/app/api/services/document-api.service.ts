import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IDocument} from '../types/document.type';
import documents from '../../../../server/test.json';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {
  // tslint:disable-next-line:variable-name
  private documents$ = new BehaviorSubject<IDocument[]>([]);

  constructor(private apiService: ApiService) {
    this.documents$.next(documents);
  }

  public all(): Observable<IDocument[]> {
    return of(documents);
    // return this.apiService.get('/documents')
    //   .pipe(tap((docs) => this._documents$.next(docs)));
  }

  public byId(id: number): Observable<IDocument> {
    return of(
      this.documents$.getValue().find((document) => document.id === Number(id))
    );
  }

  public save(document: IDocument): void {
    console.log(document);
  }
}
