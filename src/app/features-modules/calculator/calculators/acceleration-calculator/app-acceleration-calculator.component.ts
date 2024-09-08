import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { AppCalculatorService } from '../../services/app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

const DEFAULT_MULTIPLIER = 4;

@Component({
    selector: 'app-acceleration-calculator',
    templateUrl: './app-acceleration-calculator.component.html',
})
export class AppAccelerationCalculatorComponent implements OnInit {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public a = 0;

    public form = new FormGroup({
        thrust: new FormControl(),
        weight: new FormControl(),
        multiplier: new FormControl(DEFAULT_MULTIPLIER),
    });

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateA());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: 'Acceleration',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculateA(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.a = 0;
            return;
        } else {
            this.a = this.appCalculatorService.calculateAcceleration(
                this.form.controls.thrust.value,
                this.form.controls.weight.value,
                this.form.controls.multiplier.value || DEFAULT_MULTIPLIER,
            );
        }
    }
}
