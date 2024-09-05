import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNavigationItem } from './app-navigation.item';
import { Router } from '@angular/router';

@Injectable()
export class AppNavigationService {
    private readonly _itemsSubject = new BehaviorSubject<AppNavigationItem[]>([]);

    public readonly items$ = this._itemsSubject.asObservable();

    constructor(private readonly router: Router) {}

    public registerNavigationItems(items: AppNavigationItem[]): void {
        const currentItems = [...this._itemsSubject.getValue()];
        currentItems.push(...items);
        this._itemsSubject.next(currentItems.sort((a, b) => a.pos - b.pos));
        this.updateRoutes();
    }

    private updateRoutes(): void {
        this.router.resetConfig([...this.router.config, ...this._itemsSubject.getValue().map((item) => item.route)]);
    }
}
