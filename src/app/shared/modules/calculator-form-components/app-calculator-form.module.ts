import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCalculatorFormBatterySizeSelect } from './battery-size-select/app-calculator-form-battery-size-select.component';
import { AppCalculatorFormMachSelect } from './mach-select/app-calculator-form-mach-select.component';
import { AppCalculatorFormNumberInput } from './number-input/app-calculator-form-number-input.component';
import { AppCalculatorFormPercentageSelect } from './percentage-select/app-calculator-form-percentage-select.component';
import { AppCalculatorFormPropellerSizeSelect } from './propeller-size-select/app-calculator-form-propeller-size-select.component';

const AppCalculatorFormsComponents = [
    AppCalculatorFormBatterySizeSelect,
    AppCalculatorFormMachSelect,
    AppCalculatorFormNumberInput,
    AppCalculatorFormPercentageSelect,
    AppCalculatorFormPropellerSizeSelect,
];

const Modules = [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
];

@NgModule({
    imports: Modules,
    declarations: AppCalculatorFormsComponents,
    exports: [...Modules, ...AppCalculatorFormsComponents],
})
export class AppCalculatorFormsModule {}
