import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNavigationItem } from './app-navigation.item';
import { AppNavigationService } from './app-navigation.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
})
export class AppNavigationComponent {
    public readonly items$: Observable<AppNavigationItem[]>;

    constructor(private readonly appNavigationService: AppNavigationService) {
        this.items$ = this.appNavigationService.items$;
    }
}
