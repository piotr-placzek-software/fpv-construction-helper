import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormSelectOption } from '../../../shared/types/forms-specific.types';
import { BATTERY_VMAX, BatteryVmax } from '../../../shared/types/fpv-specific.types';
import { AppCalculatorService } from '../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../app-calculator.utils';

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    public rpm = 0;

    public readonly batterySizeSelectorOptions: FormSelectOption<BatteryVmax>[] = Object.entries(BATTERY_VMAX).map(
        ([label, value]) => ({
            label,
            value,
        }),
    );

    public readonly envLosesSelectorOptions: FormSelectOption<number>[] = Array(17)
        .fill(0)
        .map((v, i) => ({
            label: `${i * 5}%`,
            value: i * 0.05,
        }));

    public form = new FormGroup({
        batterySize: new FormControl(),
        kv: new FormControl(),
        loses: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateRpm());
    }

    private recalculateRpm(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.rpm = 0;
        } else {
            this.rpm = this.appCalculatorService.calculateRpm(
                this.form.controls.batterySize.value,
                +this.form.controls.kv.value,
                this.form.controls.loses.value,
            );
        }
    }
}
