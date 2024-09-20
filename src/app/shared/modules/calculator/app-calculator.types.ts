import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectValues } from '../../types/ts-specific.types';
import { AppCalculatorService } from '../../../features-modules/calculators/services/app-calculator.service';
import { DEFAULT_VALUE } from './app-calculator.defaults';

export const APP_CALCULATOR_FORM_CONTROL_TYPE = {
    MACH: 'mach',
    BATTERY_SIZE: 'battery-size',
    NUMERIC: 'numeric',
    PERCENTAGE: 'percentage',
} as const;

export type AppCalculatorFormControlType = ObjectValues<typeof APP_CALCULATOR_FORM_CONTROL_TYPE>;

export interface IAppCalculatorFormControlConfig<T extends AppCalculatorFormControlType> {
    type: T;
    positionIndex: number;
    formControlName: string;
    label?: string;
    defaultValue?: number;
}

class AppCalculatorFormControlConfigVariantA {
    constructor(public readonly formControlName: string, public readonly positionIndex: number = 0) {}
}

class AppCalculatorFormControlConfigVariantB {
    constructor(
        public readonly formControlName: string,
        public readonly label: string,
        public readonly positionIndex: number = 0,
        public readonly defaultValue?: number,
    ) {}
}

export class AppCalculatorMachFormControlConfig
    extends AppCalculatorFormControlConfigVariantA
    implements IAppCalculatorFormControlConfig<typeof APP_CALCULATOR_FORM_CONTROL_TYPE.MACH>
{
    public readonly type = APP_CALCULATOR_FORM_CONTROL_TYPE.MACH;
    public readonly defaultValue = DEFAULT_VALUE.MACH;
}

export class AppCalculatorBatterySizeFormControlConfig
    extends AppCalculatorFormControlConfigVariantA
    implements IAppCalculatorFormControlConfig<typeof APP_CALCULATOR_FORM_CONTROL_TYPE.BATTERY_SIZE>
{
    public readonly type = APP_CALCULATOR_FORM_CONTROL_TYPE.BATTERY_SIZE;
}

export class AppCalculatorNumericFormControlConfig
    extends AppCalculatorFormControlConfigVariantB
    implements IAppCalculatorFormControlConfig<typeof APP_CALCULATOR_FORM_CONTROL_TYPE.NUMERIC>
{
    public readonly type = APP_CALCULATOR_FORM_CONTROL_TYPE.NUMERIC;
}

export class AppCalculatorPercentageFormControlConfig
    extends AppCalculatorFormControlConfigVariantB
    implements IAppCalculatorFormControlConfig<typeof APP_CALCULATOR_FORM_CONTROL_TYPE.PERCENTAGE>
{
    public readonly type = APP_CALCULATOR_FORM_CONTROL_TYPE.PERCENTAGE;
}

export type AppCalculatorFormControlConfig = IAppCalculatorFormControlConfig<AppCalculatorFormControlType>;

export interface IAppCalculatorConfig {
    title: string;
    valueName: string;
    valueUnit?: string;
    controlsConfig: AppCalculatorFormControlConfig[];
    recalculateFunction: (form: FormGroup, appCalculatorService: AppCalculatorService) => number;
}
