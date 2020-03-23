import {Component, ComponentFactoryResolver, Injector, ViewContainerRef, ɵrenderComponent} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private injector: Injector,
              private viewContainer: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
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

  async lazyLoad() {
    const {LazyComponent} = await import('./lazy/lazy.component');
    this.viewContainer.createComponent(this.cfr.resolveComponentFactory(LazyComponent));
  }

}




/*
// 清理并新建一个component，用于lazy load
git clean -f && git co -f .
// ng g c Lazy -m Lazy -t -s
ng g c Lazy
ng serve --port 4111
const {LazyComponent} = await import('./lazy/lazy.component');
this.vcr.createComponent(this.cfr.resolveComponentFactory(LazyComponent));
*/
