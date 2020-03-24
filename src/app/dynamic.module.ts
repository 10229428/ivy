import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicComponent} from "./dynamic.component";
import {BarComponent} from "./bar/bar.component";

@NgModule({
  declarations: [DynamicComponent],
  entryComponents: [DynamicComponent, BarComponent],
  imports: [CommonModule]
})
export class DynamicModule {
  constructor() {
    console.log('DynamicModule =====> dynamic module loaded: 🔥');
  }
}
