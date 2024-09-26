export type AppDataTableColumnConfig = {
    title: string;
    columnDef: string;
    type: 'string' | 'number' | 'boolean';
    valuePrefix?: string;
    valueSuffix?: string;
    filterable?: boolean;
    sortable?: boolean;
    selectOptions?: { label: string; value: unknown }[];
};

export type AppDataTablePagination = {
    itemsTotal: number;
    pageSizeOptions: number[];
};

export type AppDataTableSourceData = {
    id: string | number;
    selected?: boolean;
    [key: string]: string | number | boolean | null | undefined;
};
