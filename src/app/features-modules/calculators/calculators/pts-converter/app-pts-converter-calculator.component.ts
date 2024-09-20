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
    selector: 'app-pts-converter-calculator',
    templateUrl: './app-pts-converter-calculator.component.html',
})
export class AppPtsConverterCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;

    public readonly config: IAppCalculatorConfig = {
        title: 'Propeller tip speed conversion',
        valueName: 'KV',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('primaryKv', 'Primary motor KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
            new AppCalculatorNumericFormControlConfig('primaryPropellerSize', 'Primary prop size [inch]', 4),
            new AppCalculatorNumericFormControlConfig('secondaryPropellerSize', 'Secondary prop size [inch]', 5),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.convertPtsToSecondaryKv(
                form.controls['batterySize'].value,
                form.controls['primaryKv'].value,
                form.controls['loses'].value,
                form.controls['primaryPropellerSize'].value,
                form.controls['secondaryPropellerSize'].value,
            );
        },
    } as const;
}
