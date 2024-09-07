import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppCoreModule } from './core-modules/app-core.module';
import { AppNavigationItem } from './core-modules/navigation/app-navigation.item';
import { AppNavigationService } from './core-modules/navigation/app-navigation.service';
import { AppCalculatorModule } from './features-modules/calculator/app-calculator.module';
import { AppLayoutComponent } from './layout/app-layout.component';
import { AppSideNavComponent } from './layout/side-nav/app-side-nav.component';
import { AppToolbarComponent } from './layout/toolbar/app-toolbar.component';
import { AppHomePageComponent } from './pages/home-page/app-home-page.component';

const AppFeatureModules = [AppCalculatorModule];
const MatModules = [MatToolbarModule, MatSidenavModule, MatCheckboxModule, MatIconModule];
const AppLayoutComponents = [AppLayoutComponent, AppToolbarComponent, AppSideNavComponent];
@NgModule({
    declarations: [AppComponent, ...AppLayoutComponents, AppHomePageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{ path: '', redirectTo: 'home', pathMatch: 'full' }]),
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
                path: 'home',
                component: AppHomePageComponent,
            }),
        ]);
    }
}
