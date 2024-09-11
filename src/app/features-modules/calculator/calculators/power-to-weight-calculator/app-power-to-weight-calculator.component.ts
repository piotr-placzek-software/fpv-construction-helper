import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppCalculatorService } from '../../services/app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';

const DEFAULT_MULTIPLIER = 4;

@Component({
    selector: 'app-power-to-weight-calculator',
    templateUrl: './app-power-to-weight-calculator.component.html',
})
export class AppPowerToWeightCalculatorComponent implements OnInit {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public p2w = 0;

    public form = new FormGroup({
        motorThrust: new FormControl(),
        weight: new FormControl(),
        multiplier: new FormControl(DEFAULT_MULTIPLIER),
    });

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateP2w());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: 'Thrust to weight ratio',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculateP2w(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.p2w = 0;
        } else {
            this.p2w = this.appCalculatorService.calculateP2w(
                this.form.controls.motorThrust.value,
                this.form.controls.weight.value,
                this.form.controls.multiplier.value || DEFAULT_MULTIPLIER,
            );
        }
    }
}
