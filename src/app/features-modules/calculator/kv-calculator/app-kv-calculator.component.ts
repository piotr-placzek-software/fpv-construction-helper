import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormSelectOption } from '../../../shared/types/forms-specific.types';
import { BATTERY_VMAX, BatteryVmax, PROPELLER_SIZE, PropellerSize } from '../../../shared/types/fpv-specific.types';
import { AppCalculatorService } from '../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../app-calculator.utils';

@Component({
    selector: 'app-kv-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent implements OnInit {
    public kv = 0;

    public readonly batterySizeSelectorOptions: FormSelectOption<BatteryVmax>[] = Object.entries(BATTERY_VMAX).map(
        ([label, value]) => ({
            label,
            value,
        }),
    );

    public readonly propellerSizeSelectorOptions: FormSelectOption<PropellerSize>[] = Object.entries(
        PROPELLER_SIZE,
    ).map(([label, value]) => ({
        label,
        value,
    }));

    public form = new FormGroup({
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateKv());
    }

    private recalculateKv(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.kv = 0;
        } else {
            this.kv = this.appCalculatorService.calculateKv(
                this.form.controls.batterySize.value,
                this.form.controls.propellerSize.value,
            );
        }
    }
}
