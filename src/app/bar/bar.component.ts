import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bar',
  template: `<button (click)="titleChanges.emit('changed')">{{ title }}</button>`
})
export class BarComponent implements OnInit {
  @Input()
  public title = 'Default';

  @Output()
  public titleChanges = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
