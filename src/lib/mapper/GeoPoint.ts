export default class GeoPoint {
    public lon: any = '';
    public lat: any = '';
    constructor(lon: any, lat: any) {
        this.lon = lon;
        this.lat = lat;
    }

    public toString() {
        return `lon:${this.lon} lat:${this.lat}`;
    }
}
