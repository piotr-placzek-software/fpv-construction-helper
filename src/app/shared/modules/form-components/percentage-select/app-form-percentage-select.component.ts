import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormSelectOption } from '../../../types/forms-specific.types';

@Component({
    selector: 'app-form-percentage-select',
    templateUrl: './app-form-percentage-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppFormPercentageSelect),
            multi: true,
        },
    ],
})
export class AppFormPercentageSelect implements ControlValueAccessor {
    @Input() label?: string;

    public value = 0;

    public readonly percentageSelectorOptions: FormSelectOption<number>[] = Array(17)
        .fill(0)
        .map((v, i) => ({
            label: `${i * 5}%`,
            value: i * 0.05,
        }));

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange: (value: number) => void = () => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched: () => void = () => {};

    writeValue(value: number): void {
        this.value = value;
    }

    registerOnChange(fn: (value: number) => void): void {
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
