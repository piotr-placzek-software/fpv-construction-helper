import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { divideFormConfigIntoChunks } from '../../functions/divideFlatArrayIntoChunkedArray.fn';
import { AppTextDialogService } from '../text-dialog/app-text-dialog.service';
import { AppCalculatorFormControlConfig, IAppCalculatorConfig } from './app-calculator.types';
import { fromControlsValuesIncludesNull, subscribeFormChanges } from './app-calculator.utils';
import { AppCalculatorService } from '../../../features-modules/calculators/services/app-calculator.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './app-calculator.component.html',
})
export class AppCalculatorComponent implements OnInit {
    @Input() config!: IAppCalculatorConfig;
    @Input() explanationDialogTemplateRef!: TemplateRef<unknown>;

    public value = 0;
    public form = new FormGroup({});
    public chunkedFormConfig: AppCalculatorFormControlConfig[][] = [];

    constructor(
        private readonly appCalculatorService: AppCalculatorService,
        private readonly appTextDialogService: AppTextDialogService,
    ) {}

    ngOnInit(): void {
        this.chunkedFormConfig = divideFormConfigIntoChunks(
            this.config.controlsConfig.sort((a, b) => a.positionIndex - b.positionIndex),
            3,
        );

        this.config.controlsConfig.forEach(({ formControlName, defaultValue }) => {
            this.form.addControl(formControlName, new FormControl(defaultValue ?? null));
        });
        subscribeFormChanges(this.form, () => this.recalculate());
    }

    public openExplanationDialog(): void {
        this.appTextDialogService.open({
            title: this.config.title,
            contentTemplateRef: this.explanationDialogTemplateRef,
        });
    }

    private recalculate(): void {
        if (fromControlsValuesIncludesNull(this.form)) {
            this.value = 0;
        } else {
            this.value = this.config.recalculateFunction(this.form, this.appCalculatorService);
        }
    }
}
