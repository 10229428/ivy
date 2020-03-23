import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {

  constructor(public appName: string) {
    console.log('FeatureComponent =====> appName: ', appName);
  }

  ngOnInit() {
  }

}
