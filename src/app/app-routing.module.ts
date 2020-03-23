import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module')
    .then(({FeatureModule}) => FeatureModule)
}];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  providers: [],
  exports: [RouterModule]
})
export class AppRouterModule {
}
