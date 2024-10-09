import { AppDataTableColumnConfig } from '../../../shared/modules/data-table/app-data-table.types';

export const columnsConfig: AppDataTableColumnConfig[] = [
    {
        title: 'Description',
        columnDef: 'title',
        type: 'string',
    },
    {
        title: 'Declared weight',
        columnDef: 'declaredWeight',
        type: 'number',
        valueSuffix: 'g',
    },
    {
        title: 'Measured weight',
        columnDef: 'measuredWeight',
        type: 'number',
        valueSuffix: 'g',
    },
] as const;
