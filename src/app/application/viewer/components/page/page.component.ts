import {Component, ElementRef, HostListener, Input, ViewEncapsulation} from '@angular/core';
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

  constructor(
    private documentService: DocumentService,
    private elementRef: ElementRef
  ) {}

  @HostListener('window:click', ['$event'])
  onClickOutside(event: any): void {
    if (!this.annotationSelectorIsVisible) {
      return;
    }

    const annotationEl: Element = document.querySelector('.app-annotation__wrapper');

    if (annotationEl && annotationEl.contains(event.target)) {
      this.annotationSelectorIsVisible = false;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.annotationSelectorIsVisible = false;
    }
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
    this.annotationSelectorIsVisible = false;
  }
}
