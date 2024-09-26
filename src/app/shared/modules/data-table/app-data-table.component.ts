import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AppDataTableColumnConfig, AppDataTablePagination, AppDataTableSourceData } from './app-data-table.types';

@Component({
    selector: 'app-data-table',
    templateUrl: './app-data-table.component.html',
    styleUrl: './app-data-table.component.scss',
})
export class AppDataTableComponent implements OnInit {
    @Input() columnsConfig: AppDataTableColumnConfig[] = [];
    @Input() dataSource: AppDataTableSourceData[] = [];
    @Input() pagination: AppDataTablePagination = {
        itemsTotal: 0,
        pageSizeOptions: [10, 20, 30],
    };
    @Input() checkable = false;
    @Input() loading = false;

    @Output() filterChange = new EventEmitter();
    @Output() sortingChange = new EventEmitter();
    @Output() pageChange = new EventEmitter<PageEvent>();
    @Output() selectionToggle = new EventEmitter<AppDataTableSourceData>();

    readonly filterFormGroup = new FormGroup({});
    readonly sortFormGroup = new FormGroup({});

    readonly defaultBooleanSelectOptions = [
        { label: '-', value: null },
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];
    readonly checkboxSelectOptions = [
        { label: '-', value: null },
        { label: '✓', value: true },
        { label: '⨯', value: false },
    ];

    ngOnInit(): void {
        this.filterFormGroup.addControl('selected', new FormControl());
        this.columnsConfig.forEach((columnConfig) => {
            this.filterFormGroup.addControl(columnConfig.columnDef, new FormControl());
            this.sortFormGroup.addControl(columnConfig.columnDef, new FormControl());
        });
        this.filterFormGroup.valueChanges.subscribe(this.filterChange);
        this.sortFormGroup.valueChanges.subscribe(this.sortingChange);
    }

    get matRowDef(): string[] {
        const columnDefs = this.columnsConfig.map((c) => c.columnDef);
        return this.checkable ? ['select', ...columnDefs] : columnDefs;
    }

    public toggleSelection(row: AppDataTableSourceData): void {
        this.selectionToggle.emit(row);
    }

    public switchSorting(columnName: string): void {
        const formControl = this.sortFormGroup.get(columnName)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        const currentValue = formControl.value;
        this.sortFormGroup.reset({}, { emitEvent: false });
        switch (currentValue) {
            case null:
                formControl.setValue('asc');
                break;
            case 'asc':
                formControl.setValue('desc');
                break;
            case 'desc':
                formControl.setValue(null);
                break;
        }
    }
}
