import { User } from 'src/app/shared/models/user';

export const createUser = (num: number): User => ({
  id: num,
  name: `name${num}`,
  username: `username${num}`,
  email: `email${num}`,
  address: {
    street: `street${num}`,
    suite: `suite${num}`,
    city: `city${num}`,
    zipcode: `zipcode${num}`,
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: `1-770-736-8031${num}`,
  website: `website${num}`,
  company: {
    name: `name${num}`,
    catchPhrase: `catchPhrase${num}`,
    bs: `bs${num}`,
  },
});
