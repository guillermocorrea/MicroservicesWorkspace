export interface Mappable {
  label?: string;
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}
