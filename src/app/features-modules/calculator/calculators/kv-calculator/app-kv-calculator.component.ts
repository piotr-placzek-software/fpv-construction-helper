import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppTextDialogService } from '../../../../shared/text-dialog/app-text-dialog.service';
import { AppCalculatorService } from '../../app-calculator.service';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from '../../app-calculator.utils';

@Component({
    selector: 'app-kv-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent implements OnInit {
    @ViewChild('explanationContent') explanationContentTemplateRef!: TemplateRef<unknown>;
    public kv = 0;

    public form = new FormGroup({
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
    });

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        subscribeFormChanges(this.form, () => this.recalculateKv());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({ title: 'Motor KV', contentTemplateRef: this.explanationContentTemplateRef });
    }

    private recalculateKv(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.kv = 0;
        } else {
            this.kv = this.appCalculatorService.calculateKv(
                this.form.controls.batterySize.value,
                this.form.controls.propellerSize.value,
            );
        }
    }
}
