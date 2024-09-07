import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    public rpm = 0;

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
