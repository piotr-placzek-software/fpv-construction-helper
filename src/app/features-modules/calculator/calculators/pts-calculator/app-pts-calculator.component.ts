import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { AppCalculatorService } from '../../services/app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

const DEFAULT_LOSES = 0;
@Component({
    selector: 'app-pts-calculator',
    templateUrl: './app-pts-calculator.component.html',
})
export class AppPtsCalculatorComponent implements OnInit {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public pts = 0;

    public form = new FormGroup({
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
        subscribeFormChanges(this.form, () => this.recalculatePts());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: 'Propeller tip speed',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculatePts() {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.pts = 0;
        } else {
            console.log('calculation');

            this.pts = this.appCalculatorService.calculatePts(
                this.form.controls.batterySize.value,
                this.form.controls.propellerSize.value,
                this.form.controls.kv.value,
                this.form.controls.loses.value || DEFAULT_LOSES,
            );
        }
    }
}
