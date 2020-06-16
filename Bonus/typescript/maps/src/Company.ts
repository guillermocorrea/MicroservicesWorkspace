import { Mappable } from './Mappable';
import faker from 'faker';

export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent = () => `<div>
    <h1>Company: ${this.companyName}</h1>
    <h3>Catchphrase: ${this.catchPhrase}</h3>
  </div>`;
}
