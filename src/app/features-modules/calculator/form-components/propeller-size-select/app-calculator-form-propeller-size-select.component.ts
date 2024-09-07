import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormSelectOption } from '../../../../shared/types/forms-specific.types';
import { PROPELLER_SIZE, PropellerSize } from '../../../../shared/types/fpv-specific.types';

@Component({
    selector: 'app-calculator-form-propeller-size-select',
    templateUrl: './app-calculator-form-propeller-size-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppCalculatorFormPropellerSizeSelect),
            multi: true,
        },
    ],
})
export class AppCalculatorFormPropellerSizeSelect implements ControlValueAccessor {
    public value: PropellerSize = PROPELLER_SIZE['1_INCH'];

    public readonly propellerSizeSelectorOptions: FormSelectOption<PropellerSize>[] = Object.entries(
        PROPELLER_SIZE,
    ).map(([label, value]) => ({
        label,
        value,
    }));

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange: (value: PropellerSize) => void = () => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched: () => void = () => {};

    writeValue(value: PropellerSize): void {
        this.value = value;
    }

    registerOnChange(fn: (value: PropellerSize) => void): void {
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
