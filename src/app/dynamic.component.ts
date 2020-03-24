import {Component, OnInit} from '@angular/core';

@Component({
  template: '<div style="color: red; font-size: 16px; ">dynamic component loaded!</div>'
})
export class DynamicComponent implements OnInit {

  constructor() {
    console.log('DynamicComponent =====> constructor');
  }

  ngOnInit() {
  }

}
