import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, lastValueFrom } from 'rxjs';
import {
    BatteryDescriptionEntity,
    FrameDescriptionEntity,
    MotorDescriptionEntity,
    MotorTestDataEntity,
    PART_CATEGORY,
    PartCategory,
    PartDescriptionEntity,
    PropellerDescriptionEntity,
    QueryOptions,
    StackDescriptionEntity,
    UncategorisedPartDescriptionEntity,
} from './data-types';

@Injectable()
export class AppDatabaseService {
    constructor(private readonly http: HttpClient) {}

    public findByCategory(
        category: PartCategory,
        options?: QueryOptions<unknown>,
    ): Promise<PartDescriptionEntity<PartCategory>[]> {
        switch (category.toLowerCase()) {
            case PART_CATEGORY.FRAME:
                return this.find(FrameDescriptionEntity, options) as Promise<FrameDescriptionEntity[]>;
            case PART_CATEGORY.PROPELLER:
                return this.find(PropellerDescriptionEntity, options) as Promise<PropellerDescriptionEntity[]>;
            case PART_CATEGORY.MOTOR:
                return this.find(MotorDescriptionEntity, options) as Promise<MotorDescriptionEntity[]>;
            case PART_CATEGORY.STACK:
                return this.find(StackDescriptionEntity, options) as Promise<StackDescriptionEntity[]>;
            case PART_CATEGORY.BATTERY:
                return this.find(BatteryDescriptionEntity, options) as Promise<BatteryDescriptionEntity[]>;
            case PART_CATEGORY.UNCATEGORISED:
                return this.find(UncategorisedPartDescriptionEntity, options) as Promise<
                    UncategorisedPartDescriptionEntity[]
                >;
            default:
                return Promise.resolve([]);
        }
    }

    public async find<T>(entity: T, options?: QueryOptions<T>): Promise<T[]> {
        const data = await this.readDatabaseFile(entity);
        return this.applyFilters(data, options?.where || {});
    }

    private readDatabaseFile<T>(entity: T): Promise<T[]> {
        const url =
            entity === UncategorisedPartDescriptionEntity
                ? '/assets/database/uncategorised.json'
                : entity === FrameDescriptionEntity
                ? '/assets/database/frames.json'
                : entity === PropellerDescriptionEntity
                ? '/assets/database/propellers.json'
                : entity === MotorDescriptionEntity
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
