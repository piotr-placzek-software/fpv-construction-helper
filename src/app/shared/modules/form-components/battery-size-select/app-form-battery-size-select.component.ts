import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormSelectOption } from '../../../types/forms-specific.types';
import { BATTERY_VMAX, BatteryVmax } from '../../../types/fpv-specific.types';

@Component({
    selector: 'app-form-battery-size-select',
    templateUrl: './app-form-battery-size-select.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppFormBatterySizeSelect), multi: true }],
})
export class AppFormBatterySizeSelect implements ControlValueAccessor {
    public value: BatteryVmax = BATTERY_VMAX['1S'];

    public readonly batterySizeSelectorOptions: FormSelectOption<BatteryVmax>[] = Object.entries(BATTERY_VMAX).map(
        ([label, value]) => ({
            label,
            value,
        }),
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange: (value: BatteryVmax) => void = () => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched: () => void = () => {};

    writeValue(value: BatteryVmax): void {
        this.value = value;
    }

    registerOnChange(fn: (value: BatteryVmax) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    updateValue(event: MatSelectChange): void {
        this.writeValue(event.value);
        this.onChange(event.value);
        this.onTouched();
    }
}
