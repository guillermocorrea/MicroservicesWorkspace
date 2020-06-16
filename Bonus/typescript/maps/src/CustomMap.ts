/// <reference types="@types/googlemaps" />

import { Mappable } from './Mappable';

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(mapElementId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(mapElementId),
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  addMarker(item: Mappable) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: item.location,
      label: item.label,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: item.markerContent(),
    });
    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
