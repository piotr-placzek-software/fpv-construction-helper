import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

const DEFAULT_LOSES = 0;

@Component({
    selector: 'app-rpm-calculator',
    templateUrl: './app-rpm-calculator.component.html',
})
export class AppRpmCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public rpm = 0;

    public form = new FormGroup({
        batterySize: new FormControl(),
        kv: new FormControl(),
        loses: new FormControl(DEFAULT_LOSES),
    });

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateRpm());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: 'Rotations per minute',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculateRpm(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.rpm = 0;
        } else {
            this.rpm = this.appCalculatorService.calculateRpm(
                this.form.controls.batterySize.value,
                +this.form.controls.kv.value,
                this.form.controls.loses.value || DEFAULT_LOSES,
            );
        }
    }
}
