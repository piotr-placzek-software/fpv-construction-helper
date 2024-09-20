import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';
import { AppCalculatorService } from '../../services/app-calculator.service';
import {
    AppCalculatorBatterySizeFormControlConfig,
    AppCalculatorPercentageFormControlConfig,
    AppCalculatorNumericFormControlConfig,
    IAppCalculatorConfig,
} from '../../app-calculator.types';
import { DEFAULT_VALUE } from '../../app-calculator.defaults';

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    config: IAppCalculatorConfig = {
        title: 'RPM',
        valueName: 'RPM',
        controlsConfig: [
            new AppCalculatorBatterySizeFormControlConfig('batterySize', 1),
            new AppCalculatorNumericFormControlConfig('kv', 'KV', 2),
            new AppCalculatorPercentageFormControlConfig('loses', 'Env loses [%]', 3, DEFAULT_VALUE.LOSES),
        ],
        recalculateFunction(form, appCalculatorService) {
            return appCalculatorService.calculateRpm(
                form.controls['batterySize'].value,
                form.controls['kv'].value,
                form.controls['loses'].value,
            );
        },
    };
}
