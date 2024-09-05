import { Component } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';

@Component({
    templateUrl: './app-calculator.page.html',
})
export class AppCalculatorPage {
    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get featureFlags() {
        return this.appConfigurationService.features.calculatorModule.components;
    }
}
