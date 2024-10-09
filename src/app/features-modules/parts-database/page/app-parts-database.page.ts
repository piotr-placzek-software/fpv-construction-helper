import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PART_CATEGORY, PartCategory, PartDescriptionEntity } from '../../../core-modules/database/data-types';
import { AppDatabaseService } from '../../../core-modules/database/database.service';
import {
    AppDataTableColumnConfig,
    AppDataTableSourceData,
} from '../../../shared/modules/data-table/app-data-table.types';
import { columnsConfig as framesColumnsConfig } from '../columns-config/frames-columns.config';
import { columnsConfig as propellersColumnsConfig } from '../columns-config/propellers-columns.config';

import { columnsConfig as batteriesColumnsConfig } from '../columns-config/batteries-columns.config';
import { columnsConfig as motorsColumnsConfig } from '../columns-config/motors-columns.config';
import { columnsConfig as stacksColumnsConfig } from '../columns-config/stacks-columns.config';
import { columnsConfig as uncategorisedColumnsConfig } from '../columns-config/uncategorised-columns.config';

@Component({
    templateUrl: './app-parts-database.page.html',
})
export class AppPartsDatabasePage implements OnInit {
    public columnsConfig: AppDataTableColumnConfig[] = framesColumnsConfig;
    public dataSource: AppDataTableSourceData[] = [];

    public readonly pagination = {
        itemsTotal: 30,
        pageSizeOptions: [10],
    };

    public readonly tableState = {
        pageIndex: 0,
        pageSize: 10,
        category: this.tabsLabels.at(0) as PartCategory,
    };

    get tabsLabels(): string[] {
        return Object.values(PART_CATEGORY);
    }

    constructor(private readonly databaseService: AppDatabaseService) {}

    ngOnInit(): void {
        this.fetchData();
    }

    public tabChanged(event: MatTabChangeEvent): void {
        const category = event.tab.textLabel.toLowerCase() as PartCategory;
        this.tableState.category = category;
        this.columnsConfig =
            category === PART_CATEGORY.FRAME
                ? framesColumnsConfig
                : category === PART_CATEGORY.PROPELLER
                ? propellersColumnsConfig
                : category === PART_CATEGORY.MOTOR
                ? motorsColumnsConfig
                : category === PART_CATEGORY.STACK
                ? stacksColumnsConfig
                : category === PART_CATEGORY.BATTERY
                ? batteriesColumnsConfig
                : category === PART_CATEGORY.UNCATEGORISED
                ? uncategorisedColumnsConfig
                : [];

        this.fetchData();
    }

    public pageChanged(event: PageEvent): void {
        this.tableState.pageIndex = event.pageIndex;
        this.tableState.pageSize = event.pageSize;
    }

    private async fetchData(): Promise<void> {
        try {
            const rawData = await this.databaseService.findByCategory(this.tableState.category, {
                pagination: { pageIndex: this.tableState.pageIndex, pageSize: this.tableState.pageSize },
            });
            this.pagination.itemsTotal = rawData.length;
            this.dataSource = rawData.map(this.mapRawPartDataToDataTableSource(this.tableState.category));
        } catch (error) {
            console.error(error);
        }
    }

    private mapRawPartDataToDataTableSource(category: PartCategory) {
        return (rawData: PartDescriptionEntity<typeof category>, index: number): AppDataTableSourceData => ({
            id: index,
            ...rawData,
        });
    }
}
