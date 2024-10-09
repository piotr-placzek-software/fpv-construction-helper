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
    {
        title: 'Size',
        columnDef: 'size',
        type: 'string',
        valueSuffix: 'L*W*H mm',
    },
    {
        title: 'Mounting',
        columnDef: 'mounting',
        type: 'number',
    },
    {
        title: 'Power supply',
        columnDef: 'powerSupply',
        type: 'number',
        valueSuffix: 'S',
    },
] as const;
