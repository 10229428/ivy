import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouterModule} from "./app-routing.module";
import { LazyComponent } from './lazy/lazy.component';

export const APP_NAME: InjectionToken<string> = new InjectionToken<string>('App Name');

@NgModule({
  declarations: [AppComponent, LazyComponent],
  imports: [
    BrowserModule, AppRouterModule
  ],
  providers: [{
    provide: APP_NAME,
    useValue: 'Ivy'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
