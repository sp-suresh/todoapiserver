use todoDinoDb;

db.createCollection('counters');

//Creating Counter Collections
print('Initialising counters');
db.counters.insert({_id: 'users', seq: 0});

db.todos.createIndex({'uid': 1, ets: 1});
db.users.createIndex( { 'idx': 1 }, { unique: true } );


print('Inserting Sample Users');
db.users.insertMany([
  {
    'idx': 1,
    'fnm': 'Suresh',
    'lnm': 'Prajapati',
    'hashSalt': '$2b$10$U/ka1Lh1tqJAJsWRo0zMVu',
    'pwdHash': '$2b$10$U/ka1Lh1tqJAJsWRo0zMVuxdTK3OkvRwziaieohqpBqUaIikJWwTK',//password
    'eml': 'sureshpraja1234@test.com',
    'mob': '7788994455'
  },
  {
    'idx': 2,
    'fnm': 'Ramesh',
    'lnm': 'Prajapati',
    'hashSalt': '$2b$10$U4KJ8MocuSARxaba0/cy4O',
    'pwdHash': '$2b$10$U4KJ8MocuSARxaba0/cy4Orru4rZe12Lh48X/6PoNEUYOAimauOse',//password2
    'eml': 'suresh.prajapati@z.com',
    'mob': '1122558877'
  }
]);
