import { Component } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';
import { AppDataTableColumnConfig } from '../../shared/modules/data-table/app-data-table.types';

@Component({
    templateUrl: './app-under-construction-page.component.html',
})
export class AppUnderConstructionPageComponent {
    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get appRepositoryUrl(): string {
        return this.appConfigurationService.appRepositoryUrl;
    }

    cc: AppDataTableColumnConfig[] = [
        {
            title: 'asd',
            columnDef: 'name',
            type: 'string',
        },
    ];
}
