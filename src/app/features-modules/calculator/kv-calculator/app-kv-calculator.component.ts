import { Component, OnInit } from '@angular/core';
import { FormSelectOption } from '../../../shared/types/forms-specific.types';
import { BATTERY_VMAX, BatteryVmax, PROPELLER_SIZE, PropellerSize } from '../../../shared/types/fpv-specific.types';
import { AppCalculatorService } from '../app-calculator.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-kvmax-calculator',
    templateUrl: './app-kv-calculator.component.html',
})
export class AppKvCalculatorComponent implements OnInit {
    public kv = 0;

    public readonly batterySizeSelectorOptions: FormSelectOption<BatteryVmax>[] = Object.entries(BATTERY_VMAX).map(
        ([label, value]) => ({
            label,
            value,
        }),
    );

    public readonly propellerSizeSelectorOptions: FormSelectOption<PropellerSize>[] = Object.entries(
        PROPELLER_SIZE,
    ).map(([label, value]) => ({
        label,
        value,
    }));

    private form = new FormGroup({
        batterySize: new FormControl(),
        propellerSize: new FormControl(),
    });

    constructor(private readonly appCalculatorService: AppCalculatorService) {}

    ngOnInit(): void {
        this.form.controls.batterySize.valueChanges.subscribe(() => this.recalculateKv());
        this.form.controls.propellerSize.valueChanges.subscribe(() => this.recalculateKv());
    }

    public batterySizeSelectionChanged(event: MatSelectChange): void {
        this.form.controls.batterySize.setValue(event.value);
    }

    public propellerSizeSelectionChanged(event: MatSelectChange): void {
        this.form.controls.propellerSize.setValue(event.value);
    }

    private recalculateKv(): void {
        if (!this.form.controls.batterySize.value || !this.form.controls.propellerSize.value) {
            this.kv = 0;
            return;
        }
        this.kv = this.appCalculatorService.calculateKv(
            this.form.controls.batterySize.value,
            this.form.controls.propellerSize.value,
        );
    }
}
