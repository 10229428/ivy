import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {
  visible = true;

  constructor() {
  }

  ngOnInit(): void {
    console.log('FeatureComponent =====> init')
  }

  ngAfterViewInit(): void {
    console.log('FeatureComponent =====> after view init')
  }

  console() {
    this.visible = !this.visible;
    console.log('FeatureComponent =====> Stop clicking!!!', this.visible);
  }
}
