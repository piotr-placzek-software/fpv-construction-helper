import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppConfigurationModule } from '../../core-modules/configuration/app-configuration.module';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationModule } from '../../core-modules/navigation/app-navigation.module';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppCalculatorPage } from './app-calculator.page';
import { AppCalculatorService } from './app-calculator.service';
import { AppKvCalculatorComponent } from './kv-calculator/app-kv-calculator.component';
import { CommonModule } from '@angular/common';

const AppCalculatorComponents = [AppKvCalculatorComponent];
const MatModules = [MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule];

@NgModule({
    declarations: [AppCalculatorPage, ...AppCalculatorComponents],
    imports: [CommonModule, FormsModule, AppConfigurationModule, AppNavigationModule, ...MatModules],
    providers: [AppCalculatorService],
})
export class AppCalculatorModule {
    constructor(appConfigurationService: AppConfigurationService, appNavigationService: AppNavigationService) {
        if (appConfigurationService.features.calculatorModule) {
            appNavigationService.registerNavigationItems([
                new AppNavigationItem(1, 'Calculators', 'calculate', {
                    path: 'calculators',
                    component: AppCalculatorPage,
                }),
            ]);
        }
    }
}
