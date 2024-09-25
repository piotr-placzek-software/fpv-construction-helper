import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormSelectOption } from '../../../types/forms-specific.types';
import { MACH_PART_VALUE, MachPart } from '../../../types/fpv-specific.types';

@Component({
    selector: 'app-form-mach-select',
    templateUrl: './app-form-mach-select.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppFormMachSelect), multi: true }],
})
export class AppFormMachSelect implements ControlValueAccessor {
    public value: MachPart = MACH_PART_VALUE['Mach 0.889*'];

    public readonly machSelectorOptions: FormSelectOption<MachPart>[] = Object.entries(MACH_PART_VALUE).map(
        ([label, value]) => ({
            label,
            value,
        }),
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange: (value: MachPart) => void = () => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched: () => void = () => {};

    writeValue(value: MachPart): void {
        this.value = value;
    }

    registerOnChange(fn: (value: MachPart) => void): void {
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
