import {Component, Inject, OnInit} from '@angular/core';

@Component({
  template: `Foo component loaded!`
})
export class FooComponent implements OnInit {

  constructor(@Inject('fooData') data) {
    console.log('FooComponent =====> constructor: ', data);
  }

  ngOnInit() {
  }

}
