import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-pts-converter-calculator',
    templateUrl: './app-pts-converter-calculator.component.html',
})
export class AppPtsConverterCalculatorComponent {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public kv = 0;

    public form = new FormGroup({
        batterySize: new FormControl(),
        primaryPropellerSize: new FormControl(),
        secondaryPropellerSize: new FormControl(),
        primaryKv: new FormControl(),
        loses: new FormControl(),
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
            title: 'Propeller tip speed conversion',
            contentTemplateRef: this.explanationContentTemplateRef,
        });
    }

    private recalculatePts() {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.kv = 0;
        } else {
            console.log('calculation');

            this.kv = this.appCalculatorService.convertPtsToSecondaryKv(
                this.form.controls.batterySize.value,
                this.form.controls.primaryPropellerSize.value,
                this.form.controls.secondaryPropellerSize.value,
                +this.form.controls.primaryKv.value,
                this.form.controls.loses.value,
            );
        }
    }
}
