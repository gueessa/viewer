import {Directive, ElementRef, Optional, Inject, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {filter, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective implements AfterViewInit, OnDestroy {
  @Output('onOutsideClick') outsideClickEvent = new EventEmitter<MouseEvent>();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Optional() @Inject(DOCUMENT) private document: any
  ) { }

  ngAfterViewInit(): void {
    fromEvent<MouseEvent>(this.document, 'click')
      .pipe(
        filter((event: MouseEvent) => {
          const element = event.target as HTMLElement;
          return !(element === this.element.nativeElement
            || this.element.nativeElement.contains(element));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(event => this.outsideClickEvent.emit(event));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
