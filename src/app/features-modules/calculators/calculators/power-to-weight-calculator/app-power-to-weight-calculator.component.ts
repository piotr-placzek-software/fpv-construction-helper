import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorNumericFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';
import { AppCalculatorService } from '../../app-calculator.service';

@Component({
    selector: 'app-power-to-weight-calculator',
    templateUrl: './app-power-to-weight-calculator.component.html',
})
export class AppPowerToWeightCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;

    public readonly config: IAppCalculatorConfig = {
        title: 'Power to weight ratio',
        valueName: 'T/M',
        valueUnit: ':1',
        controlsConfig: [
            new AppCalculatorNumericFormControlConfig('thrust', 'Thrust [gf]', 1),
            new AppCalculatorNumericFormControlConfig('weight', 'Weight [g]', 2),
            new AppCalculatorNumericFormControlConfig('multiplier', 'Motors amount', 3, DEFAULT_VALUE.MOTORS_AMOUNT),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.calculateP2w(
                form.controls['thrust'].value,
                form.controls['weight'].value,
                form.controls['multiplier'].value,
            );
        },
    } as const;
}
