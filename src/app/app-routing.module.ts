import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomePageComponent } from './components/home-page/app-home-page.component';

const routes: Routes = [
    {
        path: '',
        component: AppHomePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
