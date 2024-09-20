import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppCalculatorModule } from '../../shared/modules/calculator/app-calculator.module';
import { AppAccelerationCalculatorComponent } from './calculators/acceleration-calculator/app-acceleration-calculator.component';
import { AppKvCalculatorComponent } from './calculators/kv-calculator/app-kv-calculator.component';
import { AppPowerToWeightCalculatorComponent } from './calculators/power-to-weight-calculator/app-power-to-weight-calculator.component';
import { AppPtsCalculatorComponent } from './calculators/pts-calculator/app-pts-calculator.component';
import { AppPtsConverterCalculatorComponent } from './calculators/pts-converter/app-pts-converter-calculator.component';
import { AppRpmCalculatorComponent } from './calculators/rpm-calculator/app-rpm-calculator.component';
import { AppCalculatorPage } from './page/app-calculator.page';

@NgModule({
    declarations: [
        AppCalculatorPage,
        AppAccelerationCalculatorComponent,
        AppKvCalculatorComponent,
        AppPowerToWeightCalculatorComponent,
        AppPtsCalculatorComponent,
        AppPtsConverterCalculatorComponent,
        AppRpmCalculatorComponent,
    ],
    imports: [CommonModule, AppCalculatorModule],
})
export class AppCalculatorsModule {
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
