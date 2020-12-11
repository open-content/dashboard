import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.scss']
})
export class StickyComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('top') top: string = '0px';
  @Input('bottom') bottom: string = '0px';

  @Output('onSticky') onSticky: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('element') element: ElementRef;

  private _observer: IntersectionObserver;

  constructor() { }

  ngOnInit(): void {
    this._observer = new IntersectionObserver(this.callback.bind(this), {
      rootMargin: '-1px 0px 0px 0px',
      threshold: [1],
    });
  }

  private callback(mutations: IntersectionObserverEntry[], observer: IntersectionObserver) {
    this.onSticky.emit(!mutations[0].isIntersecting);
  }

  ngAfterViewInit() {
    this._observer.observe(this.element.nativeElement)
  }


  ngOnDestroy() {
    this._observer.unobserve(this.element.nativeElement);
  }

}
