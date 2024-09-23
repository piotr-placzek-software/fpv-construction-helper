import { Component, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { AppRatesChartsService } from '../app-rates-charts.service';
import { FormControl, FormGroup } from '@angular/forms';
import { subscribeFormChanges } from '../../../shared/modules/calculator/app-calculator.utils';

const SERIES_INDEX = {
    BETAFLIGHT: 0,
    ACTUAL: 1,
} as const;

@Component({
    templateUrl: './app-rates-charts.page.html',
    styleUrl: './app-rates-charts.page.scss',
})
export class AppRatesChartsPage implements OnInit {
    public chartValues: Pick<EChartsOption, 'series'> = {};
    public betaflightRotationSpeed = '';
    public actualRotationSpeed = '';

    public chartOptions: EChartsOption;

    public readonly betaflightRatesForm = new FormGroup({
        rate: new FormControl(1),
        superRate: new FormControl(0.7),
        expo: new FormControl(0),
    });

    public readonly actualRatesForm = new FormGroup({
        centerRate: new FormControl(220),
        maxRate: new FormControl(667),
        expo: new FormControl(0.65),
    });

    constructor(private readonly service: AppRatesChartsService) {
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                show: true,
                textStyle: {
                    color: 'white',
                },
            },
            tooltip: {
                trigger: 'axis',
                valueFormatter: (value) => `${Number(value) < 0 ? Number(value) * -1 : value} [deg/s]`,
            },
            xAxis: {
                data: service.stickPositions,
                splitLine: {
                    show: false,
                },
            },
            yAxis: { splitLine: { show: false } },
            series: [
                {
                    name: 'Betaflight',
                    color: 'LightSalmon',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: [],
                },
                {
                    name: 'Actual',
                    color: 'CornflowerBlue',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: [],
                },
            ],
        };
    }

    ngOnInit(): void {
        this.calculateBetaflightRates();
        subscribeFormChanges(this.betaflightRatesForm, () => this.calculateBetaflightRates());
        this.calculateActualRates();
        subscribeFormChanges(this.actualRatesForm, () => this.calculateActualRates());
    }

    private calculateBetaflightRates(): void {
        const newValues = this.service.calculateBetaflightRates(
            this.betaflightRatesForm.controls.rate.value || 1,
            this.betaflightRatesForm.controls.superRate.value || 0.7,
            this.betaflightRatesForm.controls.expo.value || 0,
        );
        this.betaflightRotationSpeed = `${newValues.at(-1)} [deg/s]`;
        this.updateChart(newValues, SERIES_INDEX.BETAFLIGHT);
    }

    private calculateActualRates(): void {
        const newValues = this.service.calculateActualRates(
            this.actualRatesForm.controls.centerRate.value || 220,
            this.actualRatesForm.controls.maxRate.value || 667,
            this.actualRatesForm.controls.expo.value || 0.65,
        );
        this.actualRotationSpeed = `${newValues.at(-1)} [deg/s]`;
        this.updateChart(newValues, SERIES_INDEX.ACTUAL);
    }

    private updateChart(newValues: number[], sIndex: number): void {
        const actualSeries = this.chartOptions.series as SeriesOption[];
        actualSeries[sIndex].data = newValues;

        this.chartOptions = Object.assign({}, this.chartOptions, {
            series: actualSeries,
        });
    }
}
