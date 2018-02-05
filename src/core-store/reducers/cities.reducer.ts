import { BaseData, CityWeather } from '../../shared/models/city';
import { CitiesActionTypes, CitiesActions } from './cities.actions';

export interface WeatherState {
    cities: CityWeather[];
    cnt: number;
}

const defaultCitiesState = {
    cities: null,
    cnt: 0,
};

const defaultBaseState = {
    humidity: 50,
    temp: 21
};

export function citiesReducer(state: CityWeather[], action: CitiesActions) {
    switch (action.type) {
        case CitiesActionTypes.DATA_FETCHED:
        case CitiesActionTypes.CALCULATED_CITIES:
            return [...action.payload];

        case CitiesActionTypes.INITIAL:
            state = [];
            return state;

        default:
            return state;
    }
}

export function baseDataReducer(state: BaseData, action: CitiesActions) {
    switch (action.type) {
        case CitiesActionTypes.INITIAL:
            state = Object.assign({}, state, defaultBaseState);
            return state;
        //
        default:
            return state;
    }
}
