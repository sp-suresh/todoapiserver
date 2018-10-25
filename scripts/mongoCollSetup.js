use todoDinoDb;

db.createCollection('counters');

//Creating Counter Collections
print('Initialising counters');
db.counters.insert({_id: 'todos', seq: 0});
db.counters.insert({_id: 'users', seq: 0});

db.todos.createIndex({'uid': 1, ets: -1});
db.users.createIndex( { 'idx': 1 }, { unique: true } );


print('Inserting Sample Users');
db.users.insertMany([
  {
    'idx': 1,
    'fnm': 'Suresh',
    'lnm': 'Prajapati',
    'hashSalt': '$2b$10$U/ka1Lh1tqJAJsWRo0zMVu',
    'pwdHash': '$2b$10$U/ka1Lh1tqJAJsWRo0zMVuxdTK3OkvRwziaieohqpBqUaIikJWwTK',//password
    'eml': 'sureshpraja1234@gmail.com',
    'mob': '9004794642'
  },
  {
    'idx': 2,
    'fnm': 'Ramesh',
    'lnm': 'Prajapati',
    'hashSalt': '$2b$10$U4KJ8MocuSARxaba0/cy4O',
    'pwdHash': '$2b$10$U4KJ8MocuSARxaba0/cy4Orru4rZe12Lh48X/6PoNEUYOAimauOse',//password2
    'eml': 'suresh.prajapati@zebpay.com',
    'mob': '9869547580'
  }
]);

// // Possible inspection venues
// print('Inserting venues');
// db.venues.insertMany([
//   {
//     'idx': 1,
//     'nm': 'Home'
//   },
//   {
//     'idx': 2,
//     'nm': 'Office'
//   },
//   {
//     'idx': 3,
//     'nm': 'Vehicle'
//   }
// ]);

// // Sample inspectors
// print('Instering inspectors');
// db.inspectors.insertMany([
//   {
//     'idx': 1,
//     'nm': 'Ramesh',
//     'mob': '9869547580'
//   },
//   {
//     'idx': 2,
//     'nm': 'Suresh',
//     'mob': '9004794642'
//   },
//   {
//     'idx': 3,
//     'nm': 'Kamesh',
//     'mob': '9969387555'
//   }
// ]);

// Sample collection data for inspections
// print('Inserting inspections')
// db.inspections.insertMany([
//   {
//   'idx': 1,
//   'inspectorId': 1,
//   'curStatus': 1,
//   'lastUpdatedTS': 1535191409371,
//   'entryTS': 1535191409371,
//   'venueType': 1,
//   'location': [
//        -122.0446183,
//        47.5891279
//     ]
//   },
//   {
//     'idx': 2,
//     'inspectorId': 1,
//     'curStatus': 2,
//     'lastUpdatedTS': 1535191309371,
//     'entryTS': 1535191309371,
//     'venueType': 2,
//     'location': [
//          -121.0446183,
//          46.5891279
//       ]
//   },
//   {
//     'idx': 3,
//     'inspectorId': 2,
//     'curStatus': 2,
//     'lastUpdatedTS': 1535191209371,
//     'entryTS': 1535191209371,
//     'venueType': 3,
//     'location': [
//          -120.0446183,
//          45.5891279
//       ]
//   },
//   {
//     'idx': 4,
//     'inspectorId': 3,
//     'curStatus': 3,
//     'lastUpdatedTS': 1535191109371,
//     'entryTS': 1535191109371,
//     'venueType': 2,
//     'location': [
//          -132.0446183,
//          57.5891279
//       ]
//   },
//   {
//     'idx': 5,
//     'inspectorId': 2,
//     'curStatus': 4,
//     'lastUpdatedTS': 1535191009371,
//     'entryTS': 1535191009371,
//     'venueType': 1,
//     'location': [
//          -22.0446183,
//          17.5891279
//       ]
//   }]
// );


// db.counters.find().pretty();

// print('db.inspections.find().pretty();');
// db.inspections.find().pretty();

// print('db.inspectors.find().pretty();');
// db.inspectors.find().pretty();

// print('db.venues.find().pretty();');
// db.venues.find().pretty();

// print('db.inspectionStatusMaster.find().pretty();');
// db.inspectionStatusMaster.find().pretty();
