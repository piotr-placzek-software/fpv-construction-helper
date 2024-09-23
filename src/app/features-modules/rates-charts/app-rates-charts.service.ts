import { Injectable } from '@angular/core';

const X_RANGE = 20;

@Injectable()
export class AppRatesChartsService {
    get stickPositions(): number[] {
        return [
            ...this.positiveStickPositions
                .slice(1)
                .map((v) => v * -1)
                .sort((a, b) => a - b),
            ...this.positiveStickPositions,
        ];
    }

    private readonly positiveStickPositions = Array(X_RANGE + 1)
        .fill(0)
        .map((_, i) => i / X_RANGE);

    public calculateBetaflightRates(rate: number, superRate: number, expo: number): number[] {
        const positiveValues = this.positiveStickPositions.map((sp) =>
            this.calculateBetaflightRateValue(sp, rate, superRate, expo),
        );
        const negativeValues = positiveValues.slice(1).map((v) => v * -1);
        return [...negativeValues.sort((a, b) => a - b), ...positiveValues];
    }

    public calculateActualRates(rate: number, superRate: number, expo: number): number[] {
        const positiveValues = this.positiveStickPositions.map((sp) =>
            this.calculateActualRateValue(sp, rate, superRate, expo),
        );
        const negativeValues = positiveValues.slice(1).map((v) => v * -1);
        return [...negativeValues.sort((a, b) => a - b), ...positiveValues];
    }

    private calculateBetaflightRateValue(stickPosition: number, rate: number, superRate: number, expo: number): number {
        const rcCommandFactor = Math.pow(stickPosition, 4) * expo + stickPosition * (1 - expo);
        const expoFactor = 200 * rcCommandFactor * rate;
        const superFactor = 1 / (1 - stickPosition * superRate);
        return Math.round(superFactor * expoFactor);
    }

    private calculateActualRateValue(stickPosition: number, centerRate: number, maxRate: number, expo: number): number {
        const expoFactor = stickPosition * (Math.pow(stickPosition, 5) * expo + stickPosition * (1 - expo));
        return Math.round(centerRate * stickPosition + (maxRate - centerRate) * expoFactor);
    }
}
