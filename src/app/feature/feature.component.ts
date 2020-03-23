import {Component, Inject, OnInit} from '@angular/core';
import {APP_NAME} from "../app.module";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {

  constructor(@Inject(APP_NAME) public appName: string) {
    console.log('FeatureComponent =====> appName: ', appName);
  }

  ngOnInit() {
  }

}
