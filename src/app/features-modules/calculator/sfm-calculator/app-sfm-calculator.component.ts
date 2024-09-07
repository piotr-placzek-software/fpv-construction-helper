import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormSelectOption } from '../../../shared/types/forms-specific.types';
import { BATTERY_VMAX, BatteryVmax, PROPELLER_SIZE, PropellerSize } from '../../../shared/types/fpv-specific.types';
import { AppCalculatorService } from '../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../app-calculator.utils';

@Component({
    selector: 'app-sfm-calculator',
    templateUrl: './app-sfm-calculator.component.html',
})
export class AppSfmCalculatorComponent implements OnInit {
    public sfm = 0;

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

    public readonly envLosesSelectorOptions: FormSelectOption<number>[] = Array(17)
        .fill(0)
        .map((v, i) => ({
            label: `${i * 5}%`,
            value: i * 0.05,
        }));

    public form = new FormGroup({
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
        kv: new FormControl(),
        loses: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateSfm());
    }

    private recalculateSfm() {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.sfm = 0;
        } else {
            console.log('calculation');

            this.sfm = this.appCalculatorService.calculatePropellerTipSpeed(
                this.form.controls.batterySize.value,
                this.form.controls.propellerSize.value,
                +this.form.controls.kv.value,
                this.form.controls.loses.value,
            );
        }
    }
}
