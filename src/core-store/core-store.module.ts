import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { baseDataReducer, citiesReducer } from './reducers/cities.reducer';
import { CitiesEffects } from './reducers/cities.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({citiesStore: citiesReducer, baseDataStore: baseDataReducer}),
        EffectsModule.forRoot([CitiesEffects])
    ],
    declarations: [],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class CoreStoreModule {
}
