import { AppDataTableColumnConfig } from '../../../shared/modules/data-table/app-data-table.types';

export const columnsConfig: AppDataTableColumnConfig[] = [
    {
        title: 'Description',
        columnDef: 'title',
        type: 'string',
    },
    {
        title: 'Declared size',
        columnDef: 'declaredSize',
        type: 'string',
        valueSuffix: 'L*W*H mm',
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
        title: 'Compatible prop size',
        columnDef: 'propSizeCompatibility',
        type: 'number',
        valueSuffix: 'inch',
    },
    {
        title: 'Compatible stack size',
        columnDef: 'stackSizeCompatibility',
        type: 'number',
        valueSuffix: 'mm',
    },
    {
        title: 'Motor mounting size',
        columnDef: 'motorMountingCompatibility',
        type: 'number',
        valueSuffix: 'mm',
    },
] as const;
