import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { AppFormComponentsModule } from '../form-components/app-form-components.module';
import { AppTextDialogModule } from '../text-dialog/app-text-dialog.module';
import { AppDataTableComponent } from './app-data-table.component';

@NgModule({
    declarations: [AppDataTableComponent],
    imports: [
        CommonModule,
        FormsModule,
        AppFormComponentsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        AppTextDialogModule,
    ],
    exports: [AppDataTableComponent],
})
export class AppDataTableModule {}
