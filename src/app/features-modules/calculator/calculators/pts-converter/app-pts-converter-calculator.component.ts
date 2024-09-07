import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-pts-converter-calculator',
    templateUrl: './app-pts-converter-calculator.component.html',
})
export class AppPtsConverterCalculatorComponent {
    public pts = 0;

    public form = new FormGroup({
        batterySize: new FormControl(),
        primaryPropellerSize: new FormControl(),
        secondaryPropellerSize: new FormControl(),
        primaryKv: new FormControl(),
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

            this.pts = this.appCalculatorService.convertPtsToSecondaryKv(
                this.form.controls.batterySize.value,
                this.form.controls.primaryPropellerSize.value,
                this.form.controls.secondaryPropellerSize.value,
                +this.form.controls.primaryKv.value,
                this.form.controls.loses.value,
            );
        }
    }
}
