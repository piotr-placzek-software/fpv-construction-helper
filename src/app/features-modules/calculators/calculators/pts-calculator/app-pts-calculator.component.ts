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
    selector: 'app-pts-calculator',
    templateUrl: './app-pts-calculator.component.html',
})
export class AppPtsCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;

    public readonly config: IAppCalculatorConfig = {
        title: 'Propeller tip speed',
        valueName: 'PTS',
        valueUnit: '[m/s]',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('kv', 'KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
            new AppCalculatorNumericFormControlConfig('propellerSize', 'Propeller size [inch]', 4),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.calculatePts(
                form.controls['batterySize'].value,
                form.controls['propellerSize'].value,
                form.controls['kv'].value,
                form.controls['loses'].value,
            );
        },
    } as const;
}
