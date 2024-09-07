import { Injectable } from '@angular/core';
import { BatteryVmax, PropellerSize } from '../../shared/types/fpv-specific.types';

@Injectable()
export class AppCalculatorService {
    public calculateKv(batterySize: BatteryVmax, propellerSize: PropellerSize): number {
        return this.round(720000 / (propellerSize * 3.14 * batterySize), 0);
    }

    public calculateRpm(batterySize: BatteryVmax, kv: number, loses = 0): number {
        if (loses < 0 || loses > 1) {
            throw new Error('Loses value should be [0,1]');
        }
        return this.round(batterySize * kv * (1 - loses));
    }

    public calculatePropellerTipSpeed(
        batterySize: BatteryVmax,
        propellerSize: PropellerSize,
        kv: number,
        loses = 0,
    ): number {
        const propellerRadius = (propellerSize * 0.0254) / 2;
        const rpm = this.calculateRpm(batterySize, kv, loses);
        return this.round((propellerRadius * 6.28 * rpm) / 60);
    }

    public calculateAcceleration(motorThrust: number, weightInGrams: number, multiplier = 4) {
        return this.round(((motorThrust / 1000) * 9.81 * multiplier) / (weightInGrams / 1000));
    }

    private round(value: number, precision: 0 | 2 = 2): number {
        return precision ? Math.round((value + Number.EPSILON) * 100) / 100 : Math.round(value);
    }
}
