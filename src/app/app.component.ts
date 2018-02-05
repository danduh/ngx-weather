import { Component, OnInit } from '@angular/core';
import { CityWeather } from '../shared/models/city';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { WeatherState } from '../core-store/reducers/cities.reducer';
import { Store } from '@ngrx/store';
import * as StoreActions from '../core-store/reducers/cities.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    cities: Observable<CityWeather[]>;
    form: FormGroup;

    constructor(private store: Store<WeatherState>,
                private fb: FormBuilder) {
        this.form = fb.group({
            temp: 21,
            humidity: 50,
        });
    }

    ngOnInit() {
        this.store.dispatch(new StoreActions.FetchData());
    }

    onSubmit() {
        this.store.dispatch(new StoreActions.CalculateDiffsIndex(this.form.value));
    }
}
