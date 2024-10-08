import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppConfigurationModule } from './configuration/app-configuration.module';
import { AppDatabaseModule } from './database/database.module';
import { AppNavigationModule } from './navigation/app-navigation.module';

const AppCoreModules = [CommonModule, AppConfigurationModule, AppNavigationModule, AppDatabaseModule];

@NgModule({
    imports: [...AppCoreModules],
    exports: [...AppCoreModules],
})
export class AppCoreModule {}
