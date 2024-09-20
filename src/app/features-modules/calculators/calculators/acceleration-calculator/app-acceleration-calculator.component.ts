import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DEFAULT_VALUE } from '../../../../shared/modules/calculator/app-calculator.defaults';
import {
    AppCalculatorNumericFormControlConfig,
    IAppCalculatorConfig,
} from '../../../../shared/modules/calculator/app-calculator.types';

@Component({
    selector: 'app-acceleration-calculator',
    templateUrl: './app-acceleration-calculator.component.html',
})
export class AppAccelerationCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'Acceleration',
        valueName: 's',
        valueUnit: '[m/s²]',
        controlsConfig: [
            new AppCalculatorNumericFormControlConfig('thrust', 'Thrust [gf]', 1),
            new AppCalculatorNumericFormControlConfig('weight', 'Weight [g]', 2),
            new AppCalculatorNumericFormControlConfig('multiplier', 'Motors amount', 3, DEFAULT_VALUE.MOTORS_AMOUNT),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculateAcceleration(
                form.controls['thrust'].value,
                form.controls['weight'].value,
                form.controls['multiplier'].value,
            );
        },
    };
}
