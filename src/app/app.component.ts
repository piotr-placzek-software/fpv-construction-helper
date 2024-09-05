import { Component } from '@angular/core';
import { AppConfigurationService } from './core-modules/configuration/app-configuration.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(appConfigurationService: AppConfigurationService) {
        appConfigurationService.appTitle = 'FpvConstructionHelper';
        appConfigurationService.appDescription =
            'An app for performing calculations and comparing parts, supporting the construction of an FPV drone.';
        appConfigurationService.appRepositoryUrl = 'https://github.com/piotr-placzek-software/fpv-construction-helper';
    }
}
