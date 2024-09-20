import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    AppCalculatorPercentageFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';

@Component({
    selector: 'app-pts-calculator',
    templateUrl: './app-pts-calculator.component.html',
})
export class AppPtsCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'Propeller tip speed',
        valueName: 'PTS',
        valueUnit: '[m/s]',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('propellerSize', 'Propeller size [inch]', 2),
            new AppCalculatorNumericFormControlConfig('kv', 'KV', 3),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 4, DEFAULT_VALUE.LOSES),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculatePts(
                form.controls['batterySize'].value,
                form.controls['propellerSize'].value,
                form.controls['kv'].value,
                form.controls['loses'].value,
            );
        },
    };
}
