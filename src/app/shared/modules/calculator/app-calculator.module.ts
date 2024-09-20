import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppCoreModule } from '../../../core-modules/app-core.module';
import { AppCalculatorService } from '../../../features-modules/calculators/services/app-calculator.service';
import { AppCalculatorFormsModule } from '../calculator-form-components/app-calculator-form.module';
import { AppTextDialogModule } from '../text-dialog/app-text-dialog.module';
import { AppCalculatorComponent } from './app-calculator.component';

@NgModule({
    declarations: [AppCalculatorComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        AppCalculatorFormsModule,
        AppCoreModule,
        AppTextDialogModule,
    ],
    providers: [AppCalculatorService],
    exports: [AppCalculatorComponent],
})
export class AppCalculatorModule {}
