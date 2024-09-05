import { Component } from '@angular/core';
import { AppConfigurationService } from './core-modules/configuration/app-configuration.service';
import { AppNavigationService } from './core-modules/navigation/app-navigation.service';
import { AppNavigationItem } from './core-modules/navigation/app-navigation.item';
import { AppHomePageComponent } from './pages/home-page/app-home-page.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(appConfigurationService: AppConfigurationService, appNavigationService: AppNavigationService) {
        appConfigurationService.appTitle = 'FpvConstructionHelper';
        appConfigurationService.appDescription =
            'An app for performing calculations and comparing parts, supporting the construction of an FPV drone.';
        appConfigurationService.appRepositoryUrl = 'https://github.com/piotr-placzek-software/fpv-construction-helper';
        appNavigationService.registerNavigationItems([
            new AppNavigationItem(0, 'Home Page', 'home', {
                path: '',
                component: AppHomePageComponent,
            }),
        ]);
    }
}
