import { Injectable } from '@angular/core';
import { BatteryVmax, PropellerSize } from '../../shared/types/fpv-specific.types';

@Injectable()
export class AppCalculatorService {
    calculateKv(batterySize: BatteryVmax, propellerSize: PropellerSize): number {
        return Math.round(720000 / (propellerSize * 3.14 * batterySize));
    }
}
