import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppCoreModule } from '../../core-modules/app-core.module';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppAccelerationCalculatorComponent } from './acceleration-calculator/app-acceleration-calculator.component';
import { AppCalculatorPage } from './app-calculator.page';
import { AppCalculatorService } from './app-calculator.service';
import { AppKvCalculatorComponent } from './kv-calculator/app-kv-calculator.component';
import { AppRpmCalculatorComponent } from './rpm-calculator/app-rpm-calculator.component';
import { AppSfmCalculatorComponent } from './sfm-calculator/app-sfm-calculator.component';
import { AppSfmConverterCalculatorComponent } from './sfm-converter/app-sfm-converter-calculator.component';

const AppCalculatorComponents = [
    AppKvCalculatorComponent,
    AppRpmCalculatorComponent,
    AppAccelerationCalculatorComponent,
    AppSfmCalculatorComponent,
    AppSfmConverterCalculatorComponent,
];
const MatModules = [MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule];

@NgModule({
    declarations: [AppCalculatorPage, ...AppCalculatorComponents],
    imports: [ReactiveFormsModule, AppCoreModule, ...MatModules],
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
