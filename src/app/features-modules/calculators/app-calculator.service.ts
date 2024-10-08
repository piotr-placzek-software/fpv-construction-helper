import { Injectable } from '@angular/core';

const GRAVITY = 9.80665;
const KG = 1000;
const FEET = 0.3048;
const MINUTE = 60;

@Injectable()
export class AppCalculatorService {
    public calculateAcceleration(motorThrust: number, weightInGrams: number, multiplier = 4) {
        const result = ((motorThrust / KG) * GRAVITY * multiplier) / (weightInGrams / KG);
        return this.round(result);
    }

    public calculateKv(machBase: number, batterySize: number, propellerSize: number): number {
        const result = (machBase * 60 * 12) / (propellerSize * Math.PI * batterySize);
        return this.round(result, 0);
    }

    public calculateKvRpm(batterySize: number, rpm: number): number {
        return this.round(rpm / batterySize);
    }

    public calculateRpm(batterySize: number, kv: number, loses = 0): number {
        if (loses < 0 || loses > 1) {
            throw new Error('Loses value should be [0,1]');
        }
        return this.round(batterySize * kv * (1 - loses));
    }

    public calculatePts(batterySize: number, propellerSize: number, kv: number, loses = 0): number {
        const result = this.calculateSfm(batterySize, propellerSize, kv, loses);
        const resultInMps = (result * FEET) / MINUTE;
        return this.round(resultInMps);
    }

    public convertPtsToSecondaryKv(
        batterySize: number,
        primaryPropellerSize: number,
        secondaryPropellerSize: number,
        primaryKv: number,
        loses = 0,
    ): number {
        const primarySfm = this.calculateSfm(batterySize, primaryPropellerSize, primaryKv, loses);
        const secondaryRpm = this.calculateRpmFromSfm(primarySfm, secondaryPropellerSize);
        return this.calculateKvRpm(batterySize, secondaryRpm);
    }

    public calculateP2w(motorThrust: number, weight: number, multiplier = 4): number {
        return this.round((motorThrust * multiplier) / weight, 0);
    }

    private calculateSfm(batterySize: number, propellerSize: number, kv: number, loses = 0): number {
        const rpm = this.calculateRpm(batterySize, kv, loses);
        return rpm * propellerSize * (Math.PI / 12);
    }

    private calculateRpmFromSfm(sfm: number, propellerSize: number): number {
        const result = (sfm * (12 / Math.PI)) / propellerSize;
        return this.round(result);
    }

    private round(value: number, precision: 0 | 2 = 2): number {
        return precision ? Math.round((value + Number.EPSILON) * 100) / 100 : Math.round(value);
    }
}
