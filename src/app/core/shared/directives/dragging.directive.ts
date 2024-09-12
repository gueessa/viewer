import {DOCUMENT} from '@angular/common';
import {Directive, ElementRef, Inject, AfterViewInit, Input, OnDestroy, EventEmitter, Output} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {ICoords} from '../../../api/types/coords.type';

@Directive({
  selector: '[appDragging]',
})
export class DraggingDirective implements AfterViewInit, OnDestroy {
  @Input() elementId!: string;
  @Input() coords!: ICoords;
  @Output() coordinatesChangedEvent = new EventEmitter<ICoords>();

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

    const minBoundX = 0;
    const minBoundY = 0;
    const maxBoundX = this.draggingElement.offsetWidth - this.element.offsetWidth;
    const maxBoundY = this.draggingElement.offsetHeight - this.element.offsetHeight;

    dragStart$.pipe(
      tap((event: MouseEvent) => {
          initialX = event.clientX - currentX;
          initialY = event.clientY - currentY;
          this.element.classList.add('dragging');
      }),
      switchMap(() =>
        drag$.pipe(
          tap((event: MouseEvent) => event.preventDefault()),
          takeUntil(dragEnd$)
        )
      )
    ).subscribe((event: MouseEvent) => {
        const x = event.clientX - initialX;
        const y = event.clientY - initialY;

        currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
        currentY = Math.max(minBoundY, Math.min(y, maxBoundY));

        this.element.style.top  = currentY + 'px';
        this.element.style.left = currentX + 'px';
    });

    dragEnd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.coordinatesChangedEvent.emit({ x: initialX, y: initialY });
      this.element.classList.remove('app-dragging');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
