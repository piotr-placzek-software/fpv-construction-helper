import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-acceleration-calculator',
    templateUrl: './app-acceleration-calculator.component.html',
})
export class AppAccelerationCalculatorComponent implements OnInit {
    public a = 0;

    public form = new FormGroup({
        thrust: new FormControl(),
        weight: new FormControl(),
        multiplier: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateA());
    }

    private recalculateA(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.a = 0;
            return;
        } else {
            this.a = this.appCalculatorService.calculateAcceleration(
                +this.form.controls.thrust.value,
                +this.form.controls.weight.value,
                +this.form.controls.multiplier.value,
            );
        }
    }
}
