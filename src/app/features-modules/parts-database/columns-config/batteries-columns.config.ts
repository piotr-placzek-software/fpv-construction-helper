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
        type: 'number',
        valueSuffix: 'S',
    },
    {
        title: 'Capacity',
        columnDef: 'capacity',
        type: 'number',
        valueSuffix: 'mah',
    },
    {
        title: 'C-Rating',
        columnDef: 'cRating',
        type: 'number',
        valueSuffix: 'C',
    },
    {
        title: 'Declared size',
        columnDef: 'declaredSize',
        type: 'number',
        valueSuffix: 'L*W*H mm',
    },
    {
        title: 'Measured size',
        columnDef: 'measuredSize',
        type: 'number',
        valueSuffix: 'L*W*H mm',
    },
] as const;
