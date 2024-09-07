import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-kv-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent implements OnInit {
    public kv = 0;

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
