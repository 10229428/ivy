import {
  AfterViewInit,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  NgModuleFactory,
  NgZone,
  Renderer2,
  Type,
  ViewChild,
  ViewContainerRef,
  ɵcreateInjector,
  ɵLifecycleHooksFeature,
  ɵrenderComponent
} from '@angular/core';
import {FooComponent} from "./foo/foo.component";
import {BarComponent} from "./bar/bar.component";
import {MatDialog} from "@angular/material/dialog";

declare const Zone: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private injector: Injector,
              private viewContainer: ViewContainerRef,
              private cfr: ComponentFactoryResolver,
              private lazyLoaderService: LazyLoaderService,
              private renderer: Renderer2,
              private ngZone: NgZone,
              private readonly matDialog: MatDialog) {
  }

  loadLazyComponentWithRender() {
    import('./lazy/lazy.component').then(({LazyComponent}) => {
      ɵrenderComponent(LazyComponent, {host: 'app-root', injector: this.injector});
    });
  }

  async loadLazyComponentWithFactory() {
    const {LazyComponent} = await import('./lazy/lazy.component');
    this.viewContainer.createComponent(this.cfr.resolveComponentFactory(LazyComponent));
  }

  async loadDynamicComponent() {
    import('./dynamic.component').then(({DynamicComponent}) => {
      ɵrenderComponent(DynamicComponent, {host: 'app-root'});
    });
  }

  async lazyLoad() {
    // 动态加载Component
    /*const {LazyComponent} = await import('./lazy/lazy.component');
    this.viewContainer.createComponent(this.cfr.resolveComponentFactory(LazyComponent));*/

    /*import('./dynamic.component').then(({DynamicComponent}) => {
      console.log('then =====> DynamicComponent: ', DynamicComponent);
      ɵrenderComponent(DynamicComponent, {host: 'app-root', injector: this.injector});
    });*/

    // 动态加载bundle
    /*const DynamicComponent = this.getDynamicComponent();
    ɵrenderComponent(DynamicComponent, {host: 'app-root', injector: this.injector});*/

    const BarComponent = this.getBarComponent();
    this.barRef = this.vcr.createComponent(this.cfr.resolveComponentFactory(BarComponent));
    this.barRef.instance.title = 'Changed';
    // Don't forget to unsubscribe
    this.barRef.instance.titleChanges.subscribe(console.log);

  }

  foo: Promise<Type<FooComponent>>;
  fooInjector: Injector;

  loadFooWithInitData() {
    if (!this.foo) {
      this.fooInjector = Injector.create({
        providers: [{
          provide: 'fooData',
          useValue: {id: 1, title: 'emoji'}
        }],
        parent: this.injector
      });

      this.foo = import(`./foo/foo.component`)
        .then(({FooComponent}) => FooComponent);
    }
  }

  @ViewChild('vcr', {read: ViewContainerRef, static: false}) vcr: ViewContainerRef;
  barRef: ComponentRef<BarComponent>;

  async loadBarWithInputAndOutput() {
    if (!this.barRef) {
      const {BarComponent} = await import(`./bar/bar.component`);
      this.barRef = this.vcr.createComponent(this.cfr.resolveComponentFactory(BarComponent));
      this.barRef.instance.title = 'Changed';
      // Don't forget to unsubscribe
      this.barRef.instance.titleChanges.subscribe(console.log);
    }
  }

  lazyDynamicModule() {
    this.lazyLoaderService.loadModule(() => import('./dynamic.module').then(m => m.DynamicModule));
  }

  getDynamicComponent(): any {
    const DynamicComponent = eval(`
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponent", function() { return DynamicComponent; });
      /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      
      const _c0 = [2, "color", "red", "font-size", "16px"];
      class DynamicComponent {
          constructor() {
              console.log('DynamicComponent =====> constructor');
          }
          ngOnInit() {
          }
      }
      DynamicComponent.ngFactoryDef = function DynamicComponent_Factory(t) { return new (t || DynamicComponent)(); };
      DynamicComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DynamicComponent, selectors: [["ng-component"]], consts: 2, vars: 0, template: function DynamicComponent_Template(rf, ctx) { if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c0);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "dynamic component loaded!");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          } }, encapsulation: 2 });
      /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DynamicComponent, [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
              args: [{
                      template: '<div style="color: red; font-size: 16px; ">dynamic component loaded with eval!</div>'
                  }]
          }], function () { return []; }, null);
      DynamicComponent;
    `);
    console.log(' eval =====> ', DynamicComponent);
    return DynamicComponent;
  }

  getBarComponent(): any {
    const BarComponent = eval(`
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarComponent", function() { return BarComponent; });
      /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      
      
      const _c0 = [3, "click"];
      class BarComponent {
          constructor() {
              this.title = 'Default';
              this.titleChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
          }
          ngOnInit() {
          }
      }
      BarComponent.ngFactoryDef = function BarComponent_Factory(t) { return new (t || BarComponent)(); };
      BarComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BarComponent, selectors: [["ng-component"]], consts: 2, vars: 1, template: function BarComponent_Template(rf, ctx) { if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", _c0);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BarComponent_Template_button_click_0_listener($event) { return ctx.titleChanges.emit("changed"); });
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          } if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
          } }, encapsulation: 2 });
      /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BarComponent, [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
              args: [{
                      template: \`<button (click)="titleChanges.emit('changed')">{{ title }}</button>\`
                  }]
          }], function () { return []; }, null);
      BarComponent;
    `);
    console.log(' eval =====> ', BarComponent);
    return BarComponent;
  }

  /**************************************************/
  @ViewChild('divRef', {static: true}) _divRef: ElementRef;

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this._divRef.nativeElement, 'click', this.handlerFromOutsideNgZone);
      // The issue is that when we run outside of Angular Zone, we are no longer able to
      // track listeners and the next line returns an empty list.
      const listeners = this._divRef.nativeElement.eventListeners('click');
      console.log('runOutsideAngular =====> ', listeners, Zone.current.name);
    });

    this.renderer.listen(this._divRef.nativeElement, 'click', this.handlerFromNgZone);
    const listeners = this._divRef.nativeElement.eventListeners('click');
    // Here we correctly retrieve all of the listeners.
    console.log('from NgZone =====> ', listeners, Zone.current.name);
  }

  handlerFromNgZone(evt: MouseEvent) {
    console.log('=====> clicked from NgZone', evt);
  }

  handlerFromOutsideNgZone(evt: MouseEvent) {
    console.log('=====> clicked from outside NgZone', evt);
  }

  /**************************************************/


  loadFeatureComponent() {
    import('./feature/feature.component').then(({FeatureComponent}) => {
      ɵrenderComponent(FeatureComponent, {injector: this.injector, hostFeatures: [ɵLifecycleHooksFeature]});
    });
  }

  async loadModalChildComponent() {
    const {ChildModule} = (await import('./child/child.module'));
    const injector = ɵcreateInjector(ChildModule, this.injector);
    const {ChildComponent} = injector.get(ChildModule);
    this.matDialog.open(ChildComponent, {data: {name: 'modal child'}});
  }
}

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  constructor(private compiler: Compiler, private injector: Injector) {
  }

  loadModule(path: any) {
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then(elementModuleOrFactory => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then(moduleFactory => {
        try {
          const elementModuleRef = moduleFactory.create(this.injector);
          const moduleInstance = elementModuleRef.instance;

          // do something with the module...
        } catch (err) {
          throw err;
        }
      });
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
