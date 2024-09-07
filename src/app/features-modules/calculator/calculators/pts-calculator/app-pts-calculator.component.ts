import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-pts-calculator',
    templateUrl: './app-pts-calculator.component.html',
})
export class AppPtsCalculatorComponent implements OnInit {
    public pts = 0;

    public form = new FormGroup({
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
        kv: new FormControl(),
        loses: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculatePts());
    }

    private recalculatePts() {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.pts = 0;
        } else {
            console.log('calculation');

            this.pts = this.appCalculatorService.calculatePts(
                this.form.controls.batterySize.value,
                this.form.controls.propellerSize.value,
                +this.form.controls.kv.value,
                this.form.controls.loses.value,
            );
        }
    }
}
