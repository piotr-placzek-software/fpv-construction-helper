import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppCoreModule } from './core-modules/app-core.module';
import { AppNavigationItem } from './core-modules/navigation/app-navigation.item';
import { AppNavigationService } from './core-modules/navigation/app-navigation.service';
import { AppCalculatorsModule } from './features-modules/calculators/app-calulators.module';
import { AppRatesChartsModule } from './features-modules/rates-charts/app-rates-charts.module';
import { AppLayoutComponent } from './layout/app-layout.component';
import { AppSideNavComponent } from './layout/side-nav/app-side-nav.component';
import { AppToolbarComponent } from './layout/toolbar/app-toolbar.component';
import { AppHomePageComponent } from './pages/home-page/app-home-page.component';
import { AppUnderConstructionPageComponent } from './pages/under-construction/app-under-construction-page.component';

const AppFeatureModules = [AppCalculatorsModule, AppRatesChartsModule];
const MatModules = [MatToolbarModule, MatSidenavModule, MatCheckboxModule, MatIconModule, MatProgressBarModule];
const AppLayoutComponents = [AppLayoutComponent, AppToolbarComponent, AppSideNavComponent];
@NgModule({
    declarations: [AppComponent, ...AppLayoutComponents, AppHomePageComponent, AppUnderConstructionPageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        ...MatModules,
        AppCoreModule,
        ...AppFeatureModules,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(appNavigationService: AppNavigationService) {
        appNavigationService.registerNavigationItems([
            new AppNavigationItem(0, 'Home Page', 'home', {
                path: '',
                component: AppHomePageComponent,
            }),
            new AppNavigationItem(
                10,
                'Parts database',
                'format_list_bulleted',
                { path: 'parts', component: AppUnderConstructionPageComponent },
                true,
            ),
            new AppNavigationItem(
                11,
                'Shopping list',
                'shopping_cart_checkout',
                { path: 'cart', component: AppUnderConstructionPageComponent },
                true,
            ),
            new AppNavigationItem(
                12,
                'Knowledge base',
                'collections_bookmark',
                { path: 'knowledge', component: AppUnderConstructionPageComponent },
                true,
            ),
        ]);
    }
}
