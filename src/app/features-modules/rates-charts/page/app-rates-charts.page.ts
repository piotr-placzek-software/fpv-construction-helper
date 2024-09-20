import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AppRatesChartsService } from '../app-rates-charts.service';
import { FormControl, FormGroup } from '@angular/forms';
import { subscribeFormChanges } from '../../../shared/modules/calculator/app-calculator.utils';

@Component({
    templateUrl: './app-rates-charts.page.html',
    styleUrl: './app-rates-charts.page.scss',
})
export class AppRatesChartsPage implements OnInit {
    public chartValues: Pick<EChartsOption, 'series'> = {};
    public betaflightRotationSpeed = '';
    // public actualRotationSpeed = '';

    public readonly chartOptions: EChartsOption;

    public readonly betaflightRatesForm = new FormGroup({
        rate: new FormControl(1),
        superRate: new FormControl(0.7),
        expo: new FormControl(0),
    });

    // public readonly actualRatesForm = new FormGroup({
    //     centerRate: new FormControl(1),
    //     maxRate: new FormControl(0.7),
    //     expo: new FormControl(0),
    // });

    constructor(private readonly service: AppRatesChartsService) {
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            radius: [20, 180],
            tooltip: {
                trigger: 'axis',
                formatter: '{c0} [deg/s]',
            },
            xAxis: {
                data: service.stickPositions,
                splitLine: {
                    show: false,
                },
            },
            yAxis: { splitLine: { show: false } },
            series: {
                name: 'Betaflight',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [],
            },
        };
    }

    ngOnInit(): void {
        this.updateBetaflightRatesChart();
        subscribeFormChanges(this.betaflightRatesForm, () => this.updateBetaflightRatesChart());
        // this.updateActualRatesChart();
        // subscribeFormChanges(this.actualRatesForm, () => this.updateActualRatesChart());
    }

    private updateBetaflightRatesChart(): void {
        const newValues = this.service.calculateBetaflightRates(
            this.betaflightRatesForm.controls.rate.value || 1,
            this.betaflightRatesForm.controls.superRate.value || 0.7,
            this.betaflightRatesForm.controls.expo.value || 0,
        );
        this.betaflightRotationSpeed = `${newValues.at(-1)} [deg/s]`;

        this.chartValues = {
            series: [
                {
                    data: newValues,
                },
            ],
        };
    }

    // private updateActualRatesChart(): void {
    //     const newValues = this.service.calculateActualRates(
    //         this.actualRatesForm.controls.centerRate.value || 1,
    //         this.actualRatesForm.controls.maxRate.value || 0.7,
    //         this.actualRatesForm.controls.expo.value || 0,
    //     );
    //     this.actualRotationSpeed = `${newValues.at(-1)} [deg/s]`;
    //     this.chartValues = {
    //         series: [
    //             {
    //                 data: newValues,
    //             },
    //         ],
    //     };
    // }
}
