import { Route } from '@angular/router';

export class AppNavigationItem {
    constructor(
        private readonly _pos: number,
        private readonly _displayText: string,
        private readonly _icon: string,
        private readonly _route: Route,
    ) {}

    get pos(): number {
        return this._pos;
    }

    get displayText(): string {
        return this._displayText;
    }

    get icon(): string {
        return this._icon;
    }

    get route(): Route {
        return this._route;
    }

    equals(other: AppNavigationItem): boolean {
        return (
            other instanceof AppNavigationItem &&
            this._pos === other.pos &&
            this._displayText === other.displayText &&
            this._icon === other.icon &&
            this._route === other.route
        );
    }
}
