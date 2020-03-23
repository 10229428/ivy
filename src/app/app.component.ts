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

  loadFeatureComponent() {
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
