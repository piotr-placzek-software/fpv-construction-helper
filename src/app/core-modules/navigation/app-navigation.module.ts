import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppNavigationComponent } from './app-navigation.component';
import { AppNavigationService } from './app-navigation.service';

@NgModule({
    declarations: [AppNavigationComponent],
    imports: [CommonModule, RouterModule, MatIconModule],
    providers: [AppNavigationService],
    exports: [AppNavigationComponent],
})
export class AppNavigationModule {}
