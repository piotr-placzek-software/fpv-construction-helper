import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppDatabaseService } from './database.service';

@NgModule({
    providers: [provideHttpClient(), AppDatabaseService],
})
export class AppDatabaseModule {}
