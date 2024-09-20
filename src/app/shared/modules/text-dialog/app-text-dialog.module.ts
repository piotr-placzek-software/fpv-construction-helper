import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppTextDialogComponent } from './app-text-dialog.component';
import { AppTextDialogService } from './app-text-dialog.service';

@NgModule({
    declarations: [AppTextDialogComponent],
    imports: [CommonModule, DialogModule, MatIconModule],
    providers: [AppTextDialogService],
    exports: [AppTextDialogComponent],
})
export class AppTextDialogModule {}
