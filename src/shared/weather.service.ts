import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BaseData, CityWeather } from './models/city';
import { WeatherState } from '../core-store/reducers/cities.reducer';
import { select, Store } from '@ngrx/store';
import { baseDataStore, citiesStore } from '../core-store/reducers/index';
import * as StoreActions from '../core-store/reducers/cities.actions';


class CityWeaterReponse {
    calctime: number;
    cnt: number;
    cod: number;
    list: CityWeather[];
}

@Injectable()
export class WeatherService {
    private apiUrl: string = environment.weatherApiUrl;
    private appId: string = environment.weatherAppId;
    private units: string = environment.units;

    private originalData: CityWeaterReponse;
    based_data$: Observable<BaseData>;
    cities$: Observable<CityWeather[]>;

    constructor(private http: HttpClient,
                private store: Store<WeatherState>) {
        this.based_data$ = store.pipe(select(baseDataStore));
        this.cities$ = store.pipe(select(citiesStore));
    }

    loadAllData(): Observable<CityWeather[]> {
        const url = `${this.apiUrl}box/city`;

        let params = new HttpParams();
        params = params.append('bbox', '0,0,180,180,5');
        params = params.append('appid', this.appId);
        params = params.append('units', this.units);

        return this.http.get(url, {params})
            .map((response: CityWeaterReponse) => response.list);
    }

    calculateObs(data): void {
        const calcs = this.calculate(data.temp, data.humidity);
        this.store.dispatch(new StoreActions.CalculatedCities(calcs));
    }

    calculate(base_temp = 21, base_numidity = 50) {
        let cities: CityWeather[] = [];
        this.cities$.subscribe((data) => {
            cities = data;
        });

        let cnt = cities.length;
        while (cnt--) {
            const city = cities[cnt];
            const temp_dif_pct = Math.abs(city.main.temp - base_temp) / base_temp;
            const humidity_dif_pct = Math.abs(city.main.humidity - base_numidity) / base_numidity;
            city.total_dif = temp_dif_pct + humidity_dif_pct;
        }
        return this.sorting(cities);
    }

    sorting(list) {
        function doSort(a, b) {
            return a.total_dif - b.total_dif;
        }

        return list.sort(doSort);
    }
}
