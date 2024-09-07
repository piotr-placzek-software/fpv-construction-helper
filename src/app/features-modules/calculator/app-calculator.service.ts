import { Injectable } from '@angular/core';
import { BatteryVmax, PropellerSize } from '../../shared/types/fpv-specific.types';

@Injectable()
export class AppCalculatorService {
    calculateKv(batterySize: BatteryVmax, propellerSize: PropellerSize): number {
        return Math.round(720000 / (propellerSize * 3.14 * batterySize));
    }

    calculateRpm(batterySize: BatteryVmax, kv: number, loses = 0): number {
        if (loses < 0 || loses > 1) {
            throw new Error('Loses value should be [0,1]');
        }
        return Math.round(batterySize * kv * (1 - loses));
    }

    calculatePropellerTipSpeed(batterySize: BatteryVmax, propellerSize: PropellerSize, kv: number, loses = 0): number {
        const propellerRadius = (propellerSize * 0.0254) / 2;
        const rpm = this.calculateRpm(batterySize, kv, loses);
        return (propellerRadius * 6.28 * rpm) / 60;
    }

    calculateAcceleration(motorThrust: number, weightInGrams: number, multiplier = 4) {
        return Math.round(((motorThrust / 1000) * 9.81 * multiplier) / (weightInGrams / 1000));
    }
}
