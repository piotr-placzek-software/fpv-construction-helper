import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    AppCalculatorPercentageFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'RPM',
        valueName: 'RPM',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('kv', 'KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculateRpm(
                form.controls['batterySize'].value,
                form.controls['kv'].value,
                form.controls['loses'].value,
            );
        },
    };
}
