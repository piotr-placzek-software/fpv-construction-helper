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
        title: 'Stator size',
        columnDef: 'size',
        type: 'number',
    },
    {
        title: 'KV',
        columnDef: 'kv',
        type: 'number',
    },
    {
        title: 'Mounting',
        columnDef: 'mounting',
        type: 'string',
    },
    {
        title: 'Power supply',
        columnDef: 'powerSupply',
        type: 'number',
        valueSuffix: 'S',
    },
    {
        title: 'Prop mount',
        columnDef: 'propMount',
        type: 'string',
    },
] as const;
