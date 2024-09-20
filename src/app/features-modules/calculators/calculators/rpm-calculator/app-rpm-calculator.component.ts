import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    AppCalculatorPercentageFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';
import { AppCalculatorService } from '../../app-calculator.service';

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;

    public readonly config: IAppCalculatorConfig = {
        title: 'RPM',
        valueName: 'RPM',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('kv', 'KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.calculateRpm(
                form.controls['batterySize'].value,
                form.controls['kv'].value,
                form.controls['loses'].value,
            );
        },
    } as const;
}
