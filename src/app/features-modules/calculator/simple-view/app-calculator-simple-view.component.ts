import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../shared/text-dialog/app-text-dialog.service';
import { MACH_PART_VALUE } from '../../../shared/types/fpv-specific.types';
import { subscribeFormChanges } from '../app-calculator.utils';
import { AppCalculatorService } from '../services/app-calculator.service';

const DEFAULT_MACH = MACH_PART_VALUE['Mach 0.889*'];
const DEFAULT_LOSES = 0;

@Component({
    selector: 'app-simple-calculator',
    templateUrl: './app-calculator-simple-view.component.html',
})
export class AppCalculatorSimpleViewComponent implements OnInit {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public kv = 0;
    public rpm = 0;
    public pts = 0;

    public form = new FormGroup({
        mach: new FormControl(DEFAULT_MACH),
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
        kv: new FormControl(),
        loses: new FormControl(DEFAULT_LOSES),
    });

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculate());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: 'Simple view',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculate(): void {
        this.kv = this.appCalculatorService.calculateKv(
            this.form.controls.mach.value || DEFAULT_MACH,
            this.form.controls.batterySize.value,
            this.form.controls.propellerSize.value,
        );
        this.rpm = this.appCalculatorService.calculateRpm(
            this.form.controls.batterySize.value,
            this.form.controls.kv.value,
            this.form.controls.loses.value || DEFAULT_LOSES,
        );
        this.pts = this.appCalculatorService.calculatePts(
            this.form.controls.batterySize.value,
            this.form.controls.propellerSize.value,
            this.form.controls.kv.value,
            this.form.controls.loses.value || DEFAULT_LOSES,
        );
    }
}
