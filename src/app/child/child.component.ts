import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  template: `<span>Hi, {{ data.name }}. I'm lazy loaded child component.</span>`
})
export class ChildComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: { name: string }) {
  }
}
