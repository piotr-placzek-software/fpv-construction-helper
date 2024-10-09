import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppNavigationItem } from '../../core-modules/navigation/app-navigation.item';
import { AppNavigationService } from '../../core-modules/navigation/app-navigation.service';
import { AppDataTableModule } from '../../shared/modules/data-table/app-data-table.module';
import { AppPartsDatabasePage } from './page/app-parts-database.page';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AppPartsDatabasePage],
    imports: [CommonModule, MatCardModule, MatTabsModule, AppDataTableModule],
})
export class AppPartsDatabaseModule {
    constructor(appConfigurationService: AppConfigurationService, appNavigationService: AppNavigationService) {
        if (appConfigurationService.features.calculatorModule) {
            appNavigationService.registerNavigationItems([
                new AppNavigationItem(3, 'Parts database', 'format_list_bulleted', {
                    path: 'parts',
                    component: AppPartsDatabasePage,
                }),
            ]);
        }
    }
}
