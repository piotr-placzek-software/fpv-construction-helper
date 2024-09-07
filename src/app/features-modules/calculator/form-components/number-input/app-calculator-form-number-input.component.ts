import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-calculator-form-number-input',
    templateUrl: './app-calculator-form-number-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppCalculatorFormNumberInput),
            multi: true,
        },
    ],
})
export class AppCalculatorFormNumberInput implements ControlValueAccessor {
    @Input() label?: string;
    @Input() step = 50;

    public value: number | null = null;

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

    updateValue(event: Event): void {
        const value = (event.target as HTMLInputElement).value || 0;
        this.writeValue(+value);
        this.onChange(+value);
        this.onTouched();
    }
}
