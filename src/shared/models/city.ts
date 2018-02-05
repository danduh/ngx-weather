export class CityWeather {
    clouds: any;
    coord: Coord;
    dt: number;
    id: number;
    main: CityWeatherMain;
    name: string;
    rain: any;
    snow: any;
    weather: Weather[];
    wind: any;
    total_dif?: number;
}

export class Coord {
    Lat: number;
    Lon: number;
}

export class CityWeatherMain {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

class Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export class BaseData {
    temp = 21;
    humidity = 50;
}
