import { Mappable } from './Mappable';
import faker from 'faker';

export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent = () => `<div>
    <h1>User: ${this.name}</h1>
  </div>`;
}
