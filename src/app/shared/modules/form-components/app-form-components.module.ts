import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFormBatterySizeSelect } from './battery-size-select/app-form-battery-size-select.component';
import { AppFormMachSelect } from './mach-select/app-form-mach-select.component';
import { AppFormNumberInput } from './number-input/app-form-number-input.component';
import { AppFormPercentageSelect } from './percentage-select/app-form-percentage-select.component';
import { AppFormPropellerSizeSelect } from './propeller-size-select/app-form-propeller-size-select.component';

const AppFormsComponents = [
    AppFormBatterySizeSelect,
    AppFormMachSelect,
    AppFormNumberInput,
    AppFormPercentageSelect,
    AppFormPropellerSizeSelect,
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
    declarations: AppFormsComponents,
    exports: [...Modules, ...AppFormsComponents],
})
export class AppFormComponentsModule {}
