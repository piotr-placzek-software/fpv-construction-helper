import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MACH_PART_VALUE } from '../../../../shared/types/fpv-specific.types';
import {
    AppCalculatorBatterySizeFormControlConfig,
    IAppCalculatorConfig,
    AppCalculatorMachFormControlConfig,
    AppCalculatorNumericFormControlConfig,
} from '../../app-calculator.types';

const DEFAULT_MACH = MACH_PART_VALUE['Mach 0.889*'];

@Component({
    selector: 'app-kv-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'Optimal KV rating',
        valueName: 'KV',
        controlsConfig: [
            new AppCalculatorMachFormControlConfig('mach'),
            new AppCalculatorBatterySizeFormControlConfig('batterySize'),
            new AppCalculatorNumericFormControlConfig('propellerSize', 'Propeller size [inch]'),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculateKv(
                form.controls['mach'].value || DEFAULT_MACH,
                form.controls['batterySize'].value,
                form.controls['propellerSize'].value,
            );
        },
    };
}
