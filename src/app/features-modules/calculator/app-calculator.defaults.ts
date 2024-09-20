import { MACH_PART_VALUE } from '../../shared/types/fpv-specific.types';

export const DEFAULT_VALUE = {
    MACH: MACH_PART_VALUE['Mach 0.889*'],
    LOSES: 0,
    MOTORS_AMOUNT: 4,
} as const;
