import { CustomMap } from './CustomMap';
import { Company } from './Company';
import { User } from './User';

const user = new User();
const company = new Company();
const map = new CustomMap('map');
map.addMarker({ ...user, label: user.name });
map.addMarker({ ...company, label: company.companyName });

console.log(user);
console.log(company);
