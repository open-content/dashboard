import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'page-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  @Input('title') title: string;
  @Input('description') description: string;
  @Input('actions') actions: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }
}
