import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private zoomValue$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public asObservable(): Observable<number> {
    return this.zoomValue$.asObservable();
  }

  public zoomIn(): void {
    this.zoomValue$.next(this.zoomValue$.getValue() + 0.1);
  }

  public zoomOut(): void {
    this.zoomValue$.next(this.zoomValue$.getValue() - 0.1);
  }
}
