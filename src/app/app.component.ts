import {Component, INJECTOR, Injector, ɵrenderComponent, ɵɵdirectiveInject} from '@angular/core';

@LazyLoadDecorator({
  path: './feature/feature.component',
  component: 'FeatureComponent',
  host: 'app-root'
})
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

  afterViewLoad() {
    console.log('AppComponent =====> Lazy HOC loaded!');
  }
}

export function LazyLoadDecorator(config: { path: string, component: string, host: string }) {
  return (cmpType) => {
    const originalFactory = cmpType.ngComponentDef.factory;
    cmpType.ngComponentDef.factory = (...args) => {
      const cmp = originalFactory(...args);
      console.log('LazyLoadComponent =====> cmp: ', cmp);
      const injector = ɵɵdirectiveInject(INJECTOR);
      import(`${config.path}`).then(m => {
        console.log('LazyLoadComponent =====> m: ', m);
        ɵrenderComponent(m[config.component], {host: config.host, injector});
      });
      if (cmp.afterViewLoad) {
        cmp.afterViewLoad();
      }
      return cmp;
    };
    return cmpType;
  };
}

export function HOC() {
  return (cmpType) => {
    const originalFactory = cmpType.ngComponentDef.factory;
    cmpType.ngComponentDef.factory = (...args) => {
      const cmp = originalFactory(...args);
      console.log(cmp);
      return cmp;
    };
  };
}

