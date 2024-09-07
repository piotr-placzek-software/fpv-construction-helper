import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-sfm-calculator',
    templateUrl: './app-sfm-calculator.component.html',
})
export class AppSfmCalculatorComponent implements OnInit {
    public sfm = 0;

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
