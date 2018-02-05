import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { BaseData, CityWeather } from '../../shared/models/city';
import { DataSource } from '@angular/cdk/collections';
import { select, Store } from '@ngrx/store';
import { WeatherState } from '../../core-store/reducers/cities.reducer';
import { baseDataStore, citiesStore } from '../../core-store/reducers/index';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'app-cities-table',
    templateUrl: './cities-table.component.html',
    styleUrls: ['./cities-table.component.scss']
})
export class CitiesTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['name', 'temp', 'humidity'];
    citiesTableDatabase = new CitiesTableDatabase();
    citiesTableSource: CitiesTableSource | null;

    cities$: Observable<CityWeather[]>;
    based_data$: Observable<BaseData>;

    constructor(private store: Store<WeatherState>) {
        this.based_data$ = store.pipe(select(baseDataStore));
        this.cities$ = store.pipe(select(citiesStore));
    }

    ngOnInit() {
        this.citiesTableSource = new CitiesTableSource(this.citiesTableDatabase, this.paginator);
        this.citiesTableDatabase.cities = this.cities$;
    }

}


export class CitiesTableDatabase {
    cities: Observable<CityWeather[]>;
}

export class CitiesTableSource extends DataSource<CityWeather> {
    constructor(private database: CitiesTableDatabase, private paginator: MatPaginator) {
        super();
    }

    connect(): Observable<CityWeather[]> {
        const displayDataChanges = [
            this.database.cities,
            this.paginator.page,
        ];


        return merge(...displayDataChanges)
            .map((_r) => {
                console.log(_r)
                let data;
                this.database.cities.subscribe((_data) => {
                    data = _data;
                });
                this.paginator.length = data.length;

                const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
                return data.slice(startIndex, startIndex + this.paginator.pageSize);
            });
    }

    disconnect() {

    }
}
