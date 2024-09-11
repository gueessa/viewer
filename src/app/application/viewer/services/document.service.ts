import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IDocument} from '../../../api/interfaces/document.interface';
import {DocumentApiService} from '../../../api/services/document-api.service';
import {first} from 'rxjs/operators';
import {IAnnotation} from '../../../api/interfaces/annotation.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // tslint:disable-next-line:variable-name
  private document$: BehaviorSubject<IDocument> = new BehaviorSubject<IDocument>(undefined);

  constructor(private api: DocumentApiService) {}

  public getDocument(id: number): Observable<IDocument> {
    this.api.byId(id).pipe(
      first()
    ).subscribe((doc: IDocument) => this.document$.next(doc));

    return  this.document$.asObservable();
  }

  public saveCurrentDocument(): void {
    this.api.save(this.document$.getValue());
  }

  public addAnnotation(annotation: IAnnotation): void {
    const document: IDocument = this.document$.getValue();

    if (!document.annotations) {
      document.annotations = [];
    }

    annotation.id = document.annotations.length + 1;
    document.annotations.push(annotation);

    this.document$.next(document);
  }

  public updateAnnotation(annotation: IAnnotation): void {
    const document: IDocument = this.document$.getValue();
    document.annotations = document.annotations.map(item => item.id === annotation.id ? annotation : item);

    this.document$.next(document);
  }

  public deleteAnnotation(id: number): void {
    const document: IDocument = this.document$.getValue();
    document.annotations = document.annotations.filter(item => item.id !== id);

    this.document$.next(document);
  }
}
