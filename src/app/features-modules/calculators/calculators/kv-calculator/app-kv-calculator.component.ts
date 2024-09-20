import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorMachFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';
import { MACH_PART_VALUE } from '../../../../shared/types/fpv-specific.types';
import { AppCalculatorService } from '../../app-calculator.service';

const DEFAULT_MACH = MACH_PART_VALUE['Mach 0.889*'];

@Component({
    selector: 'app-kv-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public readonly config: IAppCalculatorConfig = {
        title: 'Optimal KV rating',
        valueName: 'KV',
        controlsConfig: [
            new AppCalculatorMachFormControlConfig('mach'),
            new AppCalculatorBatterySizeFormControlConfig('batterySize'),
            new AppCalculatorNumericFormControlConfig('propellerSize', 'Propeller size [inch]'),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.calculateKv(
                form.controls['mach'].value || DEFAULT_MACH,
                form.controls['batterySize'].value,
                form.controls['propellerSize'].value,
            );
        },
    } as const;
}
