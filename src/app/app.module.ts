import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { CitiesTableComponent } from './cities-table/cities-table.component';
import { CoreStoreModule } from "../core-store/core-store.module";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CitiesTableComponent
    ],
    imports: [
        CoreStoreModule,
        SharedModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
