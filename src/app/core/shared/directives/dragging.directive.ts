import {DOCUMENT} from '@angular/common';
import {Directive, ElementRef, Inject, AfterViewInit, Input, OnDestroy, EventEmitter, Output} from '@angular/core';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ICoords} from '../../../api/interfaces/annotation.interface';

@Directive({
  selector: '[appDragging]',
})
export class DraggingDirective implements AfterViewInit, OnDestroy {
  @Input() elementId!: string;
  @Input() coords!: ICoords;
  @Output() newCoordsEvent = new EventEmitter<ICoords>();

  private draggingElement: HTMLElement | HTMLBodyElement;
  private element: HTMLElement;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngAfterViewInit(): void {
    this.draggingElement = (this.document as Document).querySelector(
      '#' + this.elementId
    );

    this.element = this.elementRef.nativeElement as HTMLElement;
    this.initDrag();
  }

  initDrag(): void {
    console.log('initDrag');

    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    // tslint:disable-next-line:one-variable-per-declaration
    let initialX: number,
        initialY: number,
        currentX = this.coords.x,
        currentY = this.coords.y;

    let dragSub: Subscription;

    const minBoundX = this.draggingElement.offsetLeft;
    const minBoundY = this.draggingElement.offsetTop;

    const maxBoundX =
      minBoundX +
      this.draggingElement.offsetWidth -
      this.element.offsetWidth;

    const maxBoundY =
      minBoundY +
      this.draggingElement.offsetHeight -
      this.element.offsetHeight;

    dragStart$.subscribe((event: MouseEvent) => {
      console.log('dragStart$');

      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add('app-dragging');

      dragSub = drag$.subscribe((event: MouseEvent): void => {
        event.preventDefault();

        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
        currentY = Math.max(minBoundY, Math.min(y, maxBoundY));

        console.log('currentX:' + currentX);
        console.log('currentY:' + currentY);
      });
    });

    dragEnd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      initialX = currentX;
      initialY = currentY;

      this.newCoordsEvent.emit({ x: initialX, y: initialY });
      this.element.classList.remove('app-dragging');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
