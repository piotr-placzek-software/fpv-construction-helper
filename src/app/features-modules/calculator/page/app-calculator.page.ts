import { Component } from '@angular/core';
import { AppConfigurationService } from '../../../core-modules/configuration/app-configuration.service';
import { AppCalculatorEventsService } from '../services/app-calculator-events.service';

@Component({
    templateUrl: './app-calculator.page.html',
})
export class AppCalculatorPage {
    constructor(
        public readonly appCalculatorEventsService: AppCalculatorEventsService,
        private readonly appConfigurationService: AppConfigurationService,
    ) {}

    get featureFlags() {
        return this.appConfigurationService.features.calculatorModule.components;
    }
}
