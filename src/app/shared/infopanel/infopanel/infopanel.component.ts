import { Component, OnInit, Input, TemplateRef, OnChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'socio-infopanel',
  templateUrl: './infopanel.component.html',
  styleUrls: ['./infopanel.component.scss']
})
export class InfopanelComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('panelTitle') panelTitle: string | TemplateRef<any>;
  @Input('panelBackground') panelBackground: string = '#FFFFFF';
  @Input('headerHeight') headerHeight: number = 0;
  @Input('compactScroll') compactScroll: boolean = false;
  @Input('noShadow') noShadow: boolean = false;
  @Input('actions') actions: TemplateRef<any>;

  @Output('scrollBarRef') scrollBarRef: EventEmitter<NgScrollbar> = new EventEmitter();
  
  isTemplate: boolean = false;
  wrapperHeight: string = '';

  @ViewChild(NgScrollbar, { static: true }) scrollBar: NgScrollbar;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.isTemplate = this.panelTitle instanceof TemplateRef;
  
    if(!this.panelTitle) {
      return this.wrapperHeight = `calc(100vh - 56px)`;
    }

    if(this.panelTitle && !this.headerHeight) {
      return this.wrapperHeight = `calc(100vh - 116px)`;
    }

    if(this.panelTitle && this.headerHeight) {
      this.wrapperHeight = `calc(100vh - ${56 + this.headerHeight}px)`
    }
  }

  ngAfterViewInit() {
    this.scrollBarRef.emit(this.scrollBar);
  }
}
