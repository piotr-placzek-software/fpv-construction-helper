import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppFormComponentsModule } from '../../shared/modules/form-components/app-form-components.module';
import { AppRatesChartsService } from './app-rates-charts.service';
import { AppRatesChartsPage } from './page/app-rates-charts.page';

@NgModule({
    declarations: [AppRatesChartsPage],
    imports: [NgxEchartsModule.forRoot({ echarts }), AppFormComponentsModule, MatCardModule, MatCheckboxModule],
    providers: [AppRatesChartsService],
})
export class AppRatesChartsModule {
    constructor(appConfigurationService: AppConfigurationService, appNavigationService: AppNavigationService) {
        if (appConfigurationService.features.calculatorModule) {
            appNavigationService.registerNavigationItems([
                new AppNavigationItem(2, 'Rates', 'show_chart', {
                    path: 'rates',
                    component: AppRatesChartsPage,
                }),
            ]);
        }
    }
}
