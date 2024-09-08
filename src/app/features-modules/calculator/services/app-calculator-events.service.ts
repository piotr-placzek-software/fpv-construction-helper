import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ObjectValues } from '../../../shared/types/ts-specific.types';

export const CALCULATION_EVENT_TYPE = {
    BATTERY_SIZE_CHANGED: 'BATTERY_SIZE_CHANGED',
    PROPELLER_SIZE_CHANGED: 'PROPELLER_SIZE_CHANGED',
    MOTOR_KV_CHANGED: 'MOTOR_KV_CHANGED',
    LOSES_CHANGED: 'LOSES_CHANGED',
    OPTIMAL_KV_CALCULATED: 'OPTIMAL_KV_CALCULATED',
    RPM_CALCULATED: 'RPM_CALCULATED',
} as const;
export type CalculationEventType = ObjectValues<typeof CALCULATION_EVENT_TYPE>;

export interface CalculationEvent {
    type: CalculationEventType;
    value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    propagate?: boolean;
}

@Injectable()
export class AppCalculatorEventsService {
    private readonly subject = new Subject<CalculationEvent>();

    public readonly events$ = this.subject.asObservable();
    public calculationEventsEnabled = false;

    emit(event: CalculationEvent): void {
        if (this.calculationEventsEnabled) {
            this.subject.next(event);
        }
    }
}
