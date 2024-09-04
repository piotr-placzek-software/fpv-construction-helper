import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './components/layout/app-layout.component';
import { AppSideNavComponent } from './components/layout/side-nav/app-side-nav.component';
import { AppToolbarComponent } from './components/layout/toolbar/app-toolbar.component';
import { AppHomePageComponent } from './components/home-page/app-home-page.component';

const MatModules = [MatToolbarModule, MatSidenavModule, MatCheckboxModule];
const AppLayoutComponents = [AppLayoutComponent, AppToolbarComponent, AppSideNavComponent];
@NgModule({
    declarations: [AppComponent, ...AppLayoutComponents, AppHomePageComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, ...MatModules],
    bootstrap: [AppComponent],
})
export class AppModule {}
