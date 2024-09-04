import { Component } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get appTitle(): string {
        return this.appConfigurationService.appTitle;
    }
}
