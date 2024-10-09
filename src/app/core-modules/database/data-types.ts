import { ObjectValues } from '../../shared/types/ts-specific.types';

export type QueryOptions<T> = {
    where?: Partial<T>;
    pagination?: {
        pageIndex: number;
        pageSize: number;
    };
    order?: {
        orderBy: string;
        orderDirection: 'asc' | 'desc';
    };
};

export const PART_CATEGORY = {
    FRAME: 'frame',
    PROPELLER: 'propeller',
    MOTOR: 'motor',
    STACK: 'stack',
    BATTERY: 'battery',
    UNCATEGORISED: 'uncategorised',
} as const;
export type PartCategory = ObjectValues<typeof PART_CATEGORY>;

export const PROPELLER_MOUNTING = {
    TMOUNT: 'tmount',
    SHAFT2MM: '2mm',
    SHAFT5MM: '5mm',
} as const;
export type PropellerMounting = ObjectValues<typeof PROPELLER_MOUNTING>;

export interface PartDescriptionEntity<T extends PartCategory> {
    title: string;
    declaredWeight: number;
    measuredWeight?: number | null;
    category: T;
}

export class FrameDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.FRAME> {
    readonly category = PART_CATEGORY.FRAME;
    constructor(
        public readonly title: string,
        public readonly declaredSize: string,
        public readonly declaredWeight: number,
        public readonly propSizeCompatibility: number[],
        public readonly stackSizeCompatibility: number[],
        public readonly motorMountingCompatibility: number[],
        public readonly measuredWeight?: number | null,
    ) {}
}

export class PropellerDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.PROPELLER> {
    readonly category = PART_CATEGORY.PROPELLER;
    constructor(
        public readonly title: string,
        public readonly declaredWeight: number,
        public readonly size: number,
        public readonly blades: number,
        public readonly pitch: number,
        public readonly mounting: PropellerMounting[],
        public readonly measuredWeight?: number | null,
    ) {}
}

export class MotorDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.MOTOR> {
    readonly category = PART_CATEGORY.MOTOR;
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly declaredWeight: number,
        public readonly size: number,
        public readonly kv: number,
        public readonly mounting: string,
        public readonly powerSupply: number[],
        public readonly propMount: PropellerMounting[],
        public readonly measuredWeight?: number | null,
    ) {}
}

export class StackDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.STACK> {
    readonly category = PART_CATEGORY.STACK;
    constructor(
        public readonly title: string,
        public readonly declaredWeight: number,
        public readonly size: string,
        public readonly mounting: number[],
        public readonly powerSupply: number[],
        public readonly measuredWeight?: number | null,
    ) {}
}

export class BatteryDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.BATTERY> {
    readonly category = PART_CATEGORY.BATTERY;
    constructor(
        public readonly title: string,
        public readonly declaredWeight: number,
        public readonly size: number,
        public readonly capacity: number,
        public readonly cRating: number,
        public readonly declaredSize: string,
        public readonly measuredWeight?: number | null,
        public readonly measuredSize?: string | null,
    ) {}
}

export class UncategorisedPartDescriptionEntity implements PartDescriptionEntity<typeof PART_CATEGORY.UNCATEGORISED> {
    readonly category = PART_CATEGORY.UNCATEGORISED;
    constructor(
        public readonly title: string,
        public readonly declaredWeight: number,
        public readonly measuredWeight?: number | null,
    ) {}
}

export class MotorTestDataEntity {
    constructor(
        public readonly motorId: string,
        public readonly propeller: string,
        public readonly throttle: number,
        public readonly thrust: number,
        public readonly voltage: number,
        public readonly current: number,
        public readonly rpm: number,
        public readonly power: number,
        public readonly efficiency: number,
    ) {}
}
