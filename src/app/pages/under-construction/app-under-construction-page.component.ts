import { Component } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';

@Component({
    templateUrl: './app-under-construction-page.component.html',
})
export class AppUnderConstructionPageComponent {
    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get appRepositoryUrl(): string {
        return this.appConfigurationService.appRepositoryUrl;
    }
}
