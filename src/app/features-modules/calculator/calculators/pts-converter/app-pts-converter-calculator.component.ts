import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DEFAULT_VALUE } from '../../app-calculator.defaults';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    AppCalculatorPercentageFormControlConfig,
    IAppCalculatorConfig,
} from '../../app-calculator.types';

@Component({
    selector: 'app-pts-converter-calculator',
    templateUrl: './app-pts-converter-calculator.component.html',
})
export class AppPtsConverterCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;

    config: IAppCalculatorConfig = {
        title: 'Propeller tip speed conversion',
        valueName: 'KV',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('primaryKv', 'Primary motor KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
            new AppCalculatorNumericFormControlConfig('primaryPropellerSize', 'Primary prop size [inch]', 4),
            new AppCalculatorNumericFormControlConfig('secondaryPropellerSize', 'Secondary prop size [inch]', 5),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.convertPtsToSecondaryKv(
                form.controls['batterySize'].value,
                form.controls['primaryKv'].value,
                form.controls['loses'].value,
                form.controls['primaryPropellerSize'].value,
                form.controls['secondaryPropellerSize'].value,
            );
        },
    };
}
