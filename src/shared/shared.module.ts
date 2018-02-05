import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { MatButtonModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

const SHARED_MODULES = [
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule
];

@NgModule({
    imports: [
        ...SHARED_MODULES
    ],
    exports: [
        ...SHARED_MODULES
    ],
    providers: [
        WeatherService
    ]
})
export class SharedModule {

}
