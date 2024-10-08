import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, lastValueFrom } from 'rxjs';
import {
    BatteryDescriptionEntity,
    FrameDescriptionEntity,
    MotorTestDataEntity,
    PropellerDescriptionEntity,
    StackDescriptionEntity,
    UncategorisedPartDescriptionEntity,
} from './data-types';

@Injectable()
export class AppDatabaseService {
    constructor(private readonly http: HttpClient) {}

    public async find<T>(entity: T, where?: Partial<T>): Promise<T[]> {
        const data = await this.readDatabaseFile(entity);
        return this.applyFilters(data, where || {});
    }

    private readDatabaseFile<T>(entity: T): Promise<T[]> {
        const url =
            entity === UncategorisedPartDescriptionEntity
                ? '/assets/database/uncategorised.json'
                : entity === FrameDescriptionEntity
                ? '/assets/database/frames.json'
                : entity === PropellerDescriptionEntity
                ? '/assets/database/propellers.json'
                : entity === MotorTestDataEntity
                ? '/assets/database/motors.json'
                : entity === StackDescriptionEntity
                ? '/assets/database/stacks.json'
                : entity === MotorTestDataEntity
                ? '/assets/database/motor-test-data.json'
                : entity === BatteryDescriptionEntity
                ? '/assets/database/batteries.json'
                : null;

        if (!url) {
            throw new Error('Unsupported entity type');
        }

        return lastValueFrom(this.http.get<T[]>(url));
    }

    private applyFilters<T>(data: T[], filters: Partial<T>): T[] {
        return data.filter((item: T) =>
            Object.entries(filters).every(([key, filterValue]) => {
                const itemValue = item[key as keyof T];
                if (Array.isArray(itemValue)) {
                    return itemValue.some((value) => value == filterValue);
                }
                return itemValue == filter;
            }),
        );
    }
}
