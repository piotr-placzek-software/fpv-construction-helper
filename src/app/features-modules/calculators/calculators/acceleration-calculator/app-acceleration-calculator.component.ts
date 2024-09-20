import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorNumericFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';
import { AppCalculatorService } from '../../app-calculator.service';

@Component({
    selector: 'app-acceleration-calculator',
    templateUrl: './app-acceleration-calculator.component.html',
})
export class AppAccelerationCalculatorComponent {
    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public readonly config: IAppCalculatorConfig = {
        title: 'Acceleration',
        valueName: 's',
        valueUnit: '[m/s²]',
        controlsConfig: [
            new AppCalculatorNumericFormControlConfig('thrust', 'Thrust [gf]', 1),
            new AppCalculatorNumericFormControlConfig('weight', 'Weight [g]', 2),
            new AppCalculatorNumericFormControlConfig('multiplier', 'Motors amount', 3, DEFAULT_VALUE.MOTORS_AMOUNT),
        ],
        recalculateFunction: (form: FormGroup): number => {
            return this.appCalculatorService.calculateAcceleration(
                form.controls['thrust'].value,
                form.controls['weight'].value,
                form.controls['multiplier'].value,
            );
        },
    } as const;
}
