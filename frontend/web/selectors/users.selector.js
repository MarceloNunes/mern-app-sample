import axios from 'axios';

export const selectUsers = async () => {
  await axios.get('/api/users');
};

export default selectUsers;

// return [{
//     "location": {
//       "coordinates": {
//         "latitude": 68.4896,
//         "longitude": -78.7147
//       },
//       "timezone": {
//         "offset": "+1:00"
//       },
//       "street": "3685 tunalı hilmi cd",
//       "city": "Malatya",
//       "state": "Osmaniye",
//       "zipCode": "58853"
//     },
//     "active": true,
//     "administrator": false,
//     "_id": "5b345a2836a7f74764d0d1a8",
//     "email": "ece.abacı@example.com",
//     "password": "078814b6919e6f028a1543ba96b30623c693d4901a7a3ce12ccfce8e6525083a",
//     "locator": "bd6158bd5aa589d40aa9b931e29ec76556d0372fffae9f27979883e2477ac3d7",
//     "title": "Mrs",
//     "firstName": "Ece",
//     "lastName": "Abacı",
//     "gender": "female",
//     "dateOfBirth": "1955-06-05T22:05:18.000Z",
//     "createdAt": "2005-02-14T08:08:31.000Z",
//     "picture": "https://randomuser.me/api/portraits/women/63.jpg",
//     "phones": [{
//       "_id": "5b345a2836a7f74764d0d1aa",
//       "type": "office",
//       "number": "(198)-893-4630"
//     }, {
//       "_id": "5b345a2836a7f74764d0d1a9",
//       "type": "mobile",
//       "number": "(688)-956-1407"
//     }],
//     "__v": 0
//   }, {
//     "location": {
//       "coordinates": {
//         "latitude": -68.0277,
//         "longitude": -104.8307
//       },
//       "timezone": {
//         "offset": "+5:45"
//       },
//       "street": "2098 bağdat cd",
//       "city": "Sinop",
//       "state": "Zonguldak",
//       "zipCode": "47980"
//     },
//     "active": true,
//     "administrator": false,
//     "_id": "5b345a3b36a7f74764d0d2b9",
//     "email": "latife.adal@example.com",
//     "password": "0d89f29a6cc60ae0d1deba005a4a936b53a4b60943a716525b6d7abba1cc051f",
//     "locator": "58415a28a7586d6e8db17bc7934d27eea41baddfcb93781758af49579944eef4",
//     "title": "Mrs",
//     "firstName": "Latife",
//     "lastName": "Adal",
//     "gender": "female",
//     "dateOfBirth": "1951-08-03T12:28:59.000Z",
//     "createdAt": "2016-09-12T19:10:15.000Z",
//     "picture": "https://randomuser.me/api/portraits/women/15.jpg",
//     "phones": [{
//       "_id": "5b345a3b36a7f74764d0d2bb",
//       "type": "office",
//       "number": "(631)-632-1274"
//     }, {
//       "_id": "5b345a3b36a7f74764d0d2ba",
//       "type": "mobile",
//       "number": "(633)-865-5093"
//     }],
//     "__v": 0
//   }, {
//     "location": {
//       "coordinates": {
//         "latitude": 38.1334,
//         "longitude": 60.5303
//       },
//       "timezone": {
//         "offset": "+6:00"
//       },
//       "street": "6413 wellington st",
//       "city": "Carleton",
//       "state": "Manitoba",
//       "zipCode": "T0W 9J6"
//     },
//     "active": true,
//     "administrator": false,
//     "_id": "5b34595fb2d8be463e9d5aa4",
//     "email": "ethan.addy@example.com",
//     "password": "8eab0e2407e5ecd25da88f4e74579bc02e8aca306738bd04ef39f277757f8b03",
//     "locator": "367b7b48592ab9159e828ee9b8be72122799cc22ff9acc2cb7b9e66838f3da93",
//     "title": "Mr",
//     "firstName": "Ethan",
//     "lastName": "Addy",
//     "gender": "male",
//     "dateOfBirth": "1964-02-13T07:46:12.000Z",
//     "createdAt": "2010-11-25T11:38:40.000Z",
//     "picture": "https://randomuser.me/api/portraits/men/16.jpg",
//     "phones": [{
//       "_id": "5b34595fb2d8be463e9d5aa6",
//       "type": "office",
//       "number": "841-380-8588"
//     }, {
//       "_id": "5b34595fb2d8be463e9d5aa5",
//       "type": "mobile",
//       "number": "656-110-1758"
//     }],
//     "__v": 0
//   }, {
//     "location": {
//       "coordinates": {
//         "latitude": -39.2559,
//         "longitude": -48.9498
//       },
//       "timezone": {
//         "offset": "-8:00"
//       },
//       "street": "5461 aleksanterinkatu",
//       "city": "Jalasjärvi",
//       "state": "Ostrobothnia",
//       "zipCode": "42173"
//     },
//     "active": true,
//     "administrator": false,
//     "_id": "5b345a2836a7f74764d0d1d5",
//     "email": "joel.ahola@example.com",
//     "password": "318c08dc3770a118124369a605b549a9b1fcbd56e46081c575912068e0c15ade",
//     "locator": "18b89ebe1984e57fff5d4a3698d4f6cc90180c634bbd5bb5ad26e63ad0aab1a2",
//     "title": "Mr",
//     "firstName": "Joel",
//     "lastName": "Ahola",
//     "gender": "male",
//     "dateOfBirth": "1990-09-04T20:16:10.000Z",
//     "createdAt": "2007-06-22T08:46:43.000Z",
//     "picture": "https://randomuser.me/api/portraits/men/98.jpg",
//     "phones": [{
//       "_id": "5b345a2836a7f74764d0d1d7",
//       "type": "office",
//       "number": "03-548-253"
//     }, {
//       "_id": "5b345a2836a7f74764d0d1d6",
//       "type": "mobile",
//       "number": "043-248-72-98"
//     }],
//     "__v": 0
//   }, {
//     "location": {
//       "coordinates": {
//         "latitude": 53.3656,
//         "longitude": 178.6355
//       },
//       "timezone": {
//         "offset": "+5:45"
//       },
//       "street": "9645 vatan cd",
//       "city": "Elazığ",
//       "state": "Kırşehir",
//       "zipCode": "45480"
//     },
//     "active": true,
//     "administrator": false,
//     "_id": "5b345a1b36a7f74764d0d088",
//     "email": "fatih.akışık@example.com",
//     "password": "0d89f29a6cc60ae0d1deba005a4a936b53a4b60943a716525b6d7abba1cc051f",
//     "locator": "0d7d2f442b25d1d804c0e07d784fba0db572e248b74b48250297602c3d9763da",
//     "title": "Mr",
//     "firstName": "Fatih",
//     "lastName": "Akışık",
//     "gender": "male",
//     "dateOfBirth": "1995-08-22T02:03:42.000Z",
//     "createdAt": "2002-12-26T21:47:02.000Z",
//     "picture": "https://randomuser.me/api/portraits/men/61.jpg",
//     "phones": [{
//       "_id": "5b345a1b36a7f74764d0d08a",
//       "type": "office",
//       "number": "(811)-847-6990"
//     }, {
//       "_id": "5b345a1b36a7f74764d0d089",
//       "type": "mobile",
//       "number": "(872)-326-2041"
//     }],
//     "__v": 0
//   }];
