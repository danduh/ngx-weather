import { Action } from '@ngrx/store';
import { BaseData, CityWeather } from '../../shared/models/city';

export enum CitiesActionTypes {
    FETCH_DATA = 'Load all data from API',
    DATA_FETCHED = 'All Data Loaded',
    DATA_FETCH_FAILED = 'Loading data failed',
    CALCULATE_DIFFS_INDEX = 'Calculate diffs index for each city based on given temp and humidity',
    CALCULATED_CITIES = 'Calculated Difs',
    INITIAL = '@ngrx/store/init',
}

export class FetchData implements Action {
    readonly type = CitiesActionTypes.FETCH_DATA;
}

export class DataFetched implements Action {
    readonly type = CitiesActionTypes.DATA_FETCHED;

    constructor(public payload: CityWeather[]) {
    }
}

export class DataFetchFailed implements Action {
    readonly type = CitiesActionTypes.DATA_FETCH_FAILED;
}

export class CalculateDiffsIndex implements Action {
    readonly type = CitiesActionTypes.CALCULATE_DIFFS_INDEX;

    constructor(public payload?: BaseData) {
    }
}

export class CalculatedCities implements Action {
    readonly type = CitiesActionTypes.CALCULATED_CITIES;

    constructor(public payload?: CityWeather[]) {
    }
}

export class Initial implements Action {
    readonly type = CitiesActionTypes.INITIAL;
}

export type CitiesActions =
    FetchData
    | DataFetched
    | DataFetchFailed
    | CalculateDiffsIndex
    | Initial
    | CalculatedCities;
