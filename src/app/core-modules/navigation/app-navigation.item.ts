import { Route } from '@angular/router';

export class AppNavigationItem {
    constructor(
        private readonly _pos: number,
        private readonly _displayText: string,
        private readonly _icon: string,
        private readonly _route: Route,
        private readonly _disabled = false,
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

    get disabled(): boolean {
        return this._disabled;
    }
}
