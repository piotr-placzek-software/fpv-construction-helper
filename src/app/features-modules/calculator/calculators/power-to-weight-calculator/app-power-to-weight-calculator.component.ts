import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DEFAULT_VALUE } from '../../app-calculator.defaults';
import { AppCalculatorNumericFormControlConfig, IAppCalculatorConfig } from '../../app-calculator.types';

@Component({
    selector: 'app-power-to-weight-calculator',
    templateUrl: './app-power-to-weight-calculator.component.html',
})
export class AppPowerToWeightCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'Power to weight ratio',
        valueName: 'T/M',
        valueUnit: ':1',
        controlsConfig: [
            new AppCalculatorNumericFormControlConfig('thrust', 'Thrust [gf]', 1),
            new AppCalculatorNumericFormControlConfig('weight', 'Weight [g]', 2),
            new AppCalculatorNumericFormControlConfig('multiplier', 'Motors amount', 3, DEFAULT_VALUE.MOTORS_AMOUNT),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculateP2w(
                form.controls['thrust'].value,
                form.controls['weight'].value,
                form.controls['multiplier'].value,
            );
        },
    };
}
