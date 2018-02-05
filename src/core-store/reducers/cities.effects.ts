import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { WeatherService } from '../../shared/weather.service';
import * as StoreActions from './cities.actions';
import { CitiesActionTypes } from './cities.actions';

@Injectable()
export class CitiesEffects {
    @Effect() fetchData$: Observable<Action> = this.actions$.pipe(
        ofType(CitiesActionTypes.FETCH_DATA),
        mergeMap((action) => {
                return this.sWeather.loadAllData().pipe(
                    map(data => (new StoreActions.DataFetched(data))),
                    catchError(() => of(new StoreActions.DataFetchFailed()))
                );
            }
        )
    );

    @Effect({dispatch: false}) calculateIndexes$: Observable<Action> = this.actions$
        .ofType<StoreActions.DataFetched | StoreActions.CalculateDiffsIndex>
        (CitiesActionTypes.DATA_FETCHED, CitiesActionTypes.CALCULATE_DIFFS_INDEX)
        .do((action) => {
            this.sWeather.calculateObs(action.payload);
        });

    constructor(private sWeather: WeatherService,
                private actions$: Actions) {

    }
}
