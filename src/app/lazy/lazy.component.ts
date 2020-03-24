import {Component, Inject, OnInit} from '@angular/core';
import {APP_NAME} from "../app.module";

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {

  constructor(@Inject(APP_NAME) public appName: string) {
    console.log('LazyComponent =====> appName: ', appName);
  }

  ngOnInit() {
  }

}
