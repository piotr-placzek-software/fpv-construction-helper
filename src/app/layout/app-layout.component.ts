import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
    public shouldBeVisible = true;

    public toolbarMenuIconToggled($event: boolean): void {
        this.shouldBeVisible = $event;
    }
}
