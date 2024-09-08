import { Component } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';

@Component({
    templateUrl: './app-home-page.component.html',
})
export class AppHomePageComponent {
    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get appTitle(): string {
        return this.appConfigurationService.appTitle;
    }

    get appDescription(): string {
        return this.appConfigurationService.appDescription;
    }

    get appRepositoryUrl(): string {
        return this.appConfigurationService.appRepositoryUrl;
    }
}
