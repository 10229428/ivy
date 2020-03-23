import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';

export const APP_NAME: InjectionToken<string> = new InjectionToken<string>('App Name');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: APP_NAME,
    useValue: 'Ivy'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
