import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppTextDialogData } from './app-text-dialog.types';

@Component({
    templateUrl: './app-text-dialog.component.html',
})
export class AppTextDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: AppTextDialogData,
        private dialogRef: MatDialogRef<AppTextDialogComponent>,
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}
