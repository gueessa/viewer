import {Component, Input, ViewEncapsulation} from '@angular/core';
import {IPage} from '../../../../api/types/page.type';
import {IAnnotation} from '../../../../api/types/annotation.type';
import {DocumentService} from '../../services/document.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent {
  public coords: { x: number; y: number } = { x: 0, y: 0 };
  public annotationSelectorIsVisible = false;

  @Input() docId: number;
  @Input() annotations: IAnnotation[] = [];
  @Input() page: IPage;

  constructor(private documentService: DocumentService) {}

  public hideAnnotationSelector(): void {
    this.annotationSelectorIsVisible = false;
  }

  public onClick(event: MouseEvent): void {
    if (this.annotationSelectorIsVisible) {
      this.annotationSelectorIsVisible = false;
      return;
    }

    this.coords = { x: event.offsetX, y: event.offsetY };
    this.annotationSelectorIsVisible = true;
  }

  public addAnnotation(type: 'text' | 'image'): void {
    const annotation: IAnnotation = {
      type,
      page: this.page.number,
      coords: {
        x: this.coords.x,
        y: this.coords.y
      }
    };

    this.documentService.addAnnotation(annotation);
  }
}
