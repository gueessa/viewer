import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {IDocument} from '../../api/interfaces/document.interface';
import {ZoomService} from './services/zoom.service';
import {DocumentService} from './services/document.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerComponent implements OnInit {
  public document$: Observable<IDocument>;
  public zoomValue$: Observable<number>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private zoomService: ZoomService
  ) {}

  ngOnInit(): void {
    this.document$ = this.documentService.getDocument(this.activatedRoute.snapshot.params.id);
    this.zoomValue$ = this.zoomService.asObservable();
  }
}
