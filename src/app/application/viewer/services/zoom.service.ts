import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private _zoomValue$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public asObservable(): Observable<number> {
    return this._zoomValue$.asObservable();
  }

  public zoomIn(): void {
    this._zoomValue$.next(this._zoomValue$.getValue() + 0.1);
  }

  public zoomOut(): void {
    this._zoomValue$.next(this._zoomValue$.getValue() - 0.1);
  }
}
