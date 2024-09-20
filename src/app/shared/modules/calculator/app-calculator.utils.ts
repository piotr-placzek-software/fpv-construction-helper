import { FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';

export function subscribeFormChanges<T>(
    form: FormGroup,
    observerOrNext: Partial<Observer<T>> | ((value: T) => void),
): void {
    Object.values(form.controls).forEach((control) => control.valueChanges.subscribe(observerOrNext));
}

export function fromControlsValuesIncludesNull(form: FormGroup): boolean {
    return Object.values(form.controls)
        .map((control) => control.value)
        .includes(null);
}
