import { ObjectValues } from './ts-specific.types';

export const BATTERY_VMAX = {
    '1S': 4.2,
    '2S': 8.4,
    '3S': 12.6,
    '4S': 16.8,
    '5S': 21,
    '6S': 25.2,
} as const;
export type BatteryVmax = ObjectValues<typeof BATTERY_VMAX>;

export const PROPELLER_SIZE = {
    '1_INCH': 1,
    '2_INCH': 2,
    '3_INCH': 3,
    '3_5_INCH': 3.5,
    '4_INCH': 4,
    '5_INCH': 5,
    '7_INCH': 7,
    '10_INCH': 10,
} as const;
export type PropellerSize = ObjectValues<typeof PROPELLER_SIZE>;

export const MACH_PART_VALUE = {
    'Mach 0.9': 1012.5,
    'Mach 0.889*': 1000,
    'Mach 0.8': 900.26,
    'Mach 0.7': 787.5,
} as const;
export type MachPart = ObjectValues<typeof MACH_PART_VALUE>;
