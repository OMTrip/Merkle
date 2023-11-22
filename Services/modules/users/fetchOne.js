import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export default build =>
  build.query >
  {
    query: id => `/users/${id}`,
  };

export const User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
};
