import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppCoreModule } from '../../core-modules/app-core.module';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppTextDialogModule } from '../../shared/text-dialog/app-text-dialog.module';
import { AppCalculatorPage } from './app-calculator.page';
import { AppCalculatorService } from './app-calculator.service';
import { AppAccelerationCalculatorComponent } from './calculators/acceleration-calculator/app-acceleration-calculator.component';
import { AppKvCalculatorComponent } from './calculators/kv-calculator/app-kv-calculator.component';
import { AppPtsCalculatorComponent } from './calculators/pts-calculator/app-pts-calculator.component';
import { AppPtsConverterCalculatorComponent } from './calculators/pts-converter/app-pts-converter-calculator.component';
import { AppRpmCalculatorComponent } from './calculators/rpm-calculator/app-rpm-calculator.component';
import { AppCalculatorFormBatterySizeSelect } from './form-components/battery-size-select/app-calculator-form-battery-size-select.component';
import { AppCalculatorFormNumberInput } from './form-components/number-input/app-calculator-form-number-input.component';
import { AppCalculatorFormPercentageSelect } from './form-components/percentage-select/app-calculator-form-percentage-select.component';
import { AppCalculatorFormPropellerSizeSelect } from './form-components/propeller-size-select/app-calculator-form-propeller-size-select.component';

const AppCalculatorComponents = [
    AppKvCalculatorComponent,
    AppRpmCalculatorComponent,
    AppAccelerationCalculatorComponent,
    AppPtsCalculatorComponent,
    AppPtsConverterCalculatorComponent,
];
const AppCalculatorFormComponents = [
    AppCalculatorFormBatterySizeSelect,
    AppCalculatorFormPropellerSizeSelect,
    AppCalculatorFormNumberInput,
    AppCalculatorFormPercentageSelect,
];

const MatModules = [MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule, MatIconModule];

@NgModule({
    declarations: [AppCalculatorPage, ...AppCalculatorComponents, ...AppCalculatorFormComponents],
    imports: [ReactiveFormsModule, AppCoreModule, ...MatModules, AppTextDialogModule],
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
