import { Component, EventEmitter, Output } from '@angular/core';
import { AppConfigurationService } from '../../core-modules/configuration/app-configuration.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './app-toolbar.component.html',
})
export class AppToolbarComponent {
    @Output() menuIconToggled = new EventEmitter<boolean>();

    public menuIcon: 'menu' | 'menu_open' = 'menu_open';

    constructor(private readonly appConfigurationService: AppConfigurationService) {}

    get appTitle(): string {
        return this.appConfigurationService.appTitle;
    }

    public menuIconToggle() {
        const isOpen = this.menuIcon === 'menu_open';
        this.menuIcon = isOpen ? 'menu' : 'menu_open';
        this.menuIconToggled.emit(!isOpen);
    }
}
