import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppTextDialogComponent } from './app-text-dialog.component';
import { AppTextDialogData } from './app-text-dialog.types';

@Injectable()
export class AppTextDialogService {
    constructor(private readonly dialog: MatDialog) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    open(data: AppTextDialogData): Observable<any> {
        const dialogRef = this.dialog.open(AppTextDialogComponent, {
            width: '480px',
            data,
        });

        return dialogRef.afterClosed();
    }
}
