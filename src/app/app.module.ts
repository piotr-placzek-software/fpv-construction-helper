import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppConfigurationModule } from './core-modules/configuration/app-configuration.module';
import { AppNavigationModule } from './core-modules/navigation/app-navigation.module';
import { AppLayoutComponent } from './layout/app-layout.component';
import { AppSideNavComponent } from './layout/side-nav/app-side-nav.component';
import { AppToolbarComponent } from './layout/toolbar/app-toolbar.component';
import { AppHomePageComponent } from './pages/home-page/app-home-page.component';

const AppCoreModules = [AppConfigurationModule, AppNavigationModule];
const MatModules = [MatToolbarModule, MatSidenavModule, MatCheckboxModule];
const AppLayoutComponents = [AppLayoutComponent, AppToolbarComponent, AppSideNavComponent];
@NgModule({
    declarations: [AppComponent, ...AppLayoutComponents, AppHomePageComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        FormsModule,
        ...MatModules,
        ...AppCoreModules,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
