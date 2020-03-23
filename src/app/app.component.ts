import {Component, Injector, ɵrenderComponent} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private injector: Injector) {
  }

  /**
   * 这种方式，需要在模板中配置 <app-feature></app-feature> ，否则会报 找不到host 的异常
   */
  loadFeature() {
    import('./feature/feature.component').then(({FeatureComponent}) => {
      ɵrenderComponent(FeatureComponent);
    });
  }

  /**
   * 可以将模板中的 <app-feature></app-feature> 注释掉，配置host的方式加载
   * 这种方式，会将上面的按钮替换掉，应该是整个页面都替换了
   */
  loadFeatureWithHost() {
    import('./feature/feature.component').then(({FeatureComponent}) => {
      ɵrenderComponent(FeatureComponent, {host: 'app-root', injector: this.injector});
    });
  }


}
