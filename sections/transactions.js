export default [
  {
    type: "heading",
    size: "lg",
    content: "Transactions",
    href: "Transactions"
  },
  {
    type: "text",
    content: [
      "Transactions are an important feature of relational databases, as they allow correct recovery from failures and keep a database consistent even in cases of system failure. All queries within a transaction are executed on the same database connection, and run the entire set of queries as a single unit of work. Any failure will mean the database will rollback any queries executed on that connection to the pre-transaction state.",
      "Transactions are handled by passing a handler function into `knex.transaction`. The handler function accepts a single argument, an object which may be used in two ways:\n\n1.  As the \"promise aware\" knex connection\n2.  As an object passed into a query with [](#Builder-transacting)and eventually call commit or rollback.\n\nConsider these two examples:"
    ]
  },
  {
    type: "code",
    language: "js",
    content: `
      // Using trx as a query builder:
      knex.transaction(function(trx) {

        const books = [
          {title: 'Canterbury Tales'},
          {title: 'Moby Dick'},
          {title: 'Hamlet'}
        ];

        return trx
          .insert({name: 'Old Books'}, 'id')
          .into('catalogues')
          .then(function(ids) {
            books.forEach((book) => book.catalogue_id = ids[0]);
            return trx('books').insert(books);
            });
          });
      })
      .then(function(inserts) {
        console.log(inserts.length + ' new books saved.');
      })
      .catch(function(error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
      });
    `
  },
  {
    type: "text",
    content: "And then this example:"
  },
  {
    type: "code",
    language: "js",
    content: `
      // Using trx as a transaction object:
      knex.transaction(function(trx) {

        const books = [
          {title: 'Canterbury Tales'},
          {title: 'Moby Dick'},
          {title: 'Hamlet'}
        ];

        knex.insert({name: 'Old Books'}, 'id')
          .into('catalogues')
          .transacting(trx)
          .then(function(ids) {
            books.forEach((book) => book.catalogue_id = ids[0]);
            return knex('books').insert(books).transacting(trx);
            });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function(inserts) {
        console.log(inserts.length + ' new books saved.');
      })
      .catch(function(error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
      });
    `
  },
  {
    type: "text",
    content: [
      "Throwing an error directly from the transaction handler function automatically rolls back the transaction, same as returning a rejected promise.",
      "Notice that if a promise is not returned within the handler, it is up to you to ensure `trx.commit`, or `trx.rollback` are called, otherwise the transaction connection will hang.",
      "Calling `trx.rollback` will return a rejected Promise. If you don't pass any argument to `trx.rollback`, a generic `Error` object will be created and passed in to ensure the Promise always rejects with something.",
      "Note that Amazon Redshift does not support savepoints in transactions.",
    ]
  },
  {
    type: "text",
    content: "In some cases you may prefer to create transaction but only execute statements in it later. In such case call method `transaction` without a handler function:"
  },
  {
    type: "code",
    language: "js",
    content: `
      // Using trx as a transaction object:
      const trx = await knex.transaction();

      const books = [
        {title: 'Canterbury Tales'},
        {title: 'Moby Dick'},
        {title: 'Hamlet'}
      ];

      trx('catalogues')
        .insert({name: 'Old Books'}, 'id')
        .then(function(ids) {
          books.forEach((book) => book.catalogue_id = ids[0]);
          return trx('books').insert(books);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    `
  },
  {
    type: "text",
    content: "If you want to create a reusable transaction instance, but do not want to actually start it until it is used, you can create a transaction provider instance. It will start transaction after being called for the first time, and return same transaction on subsequent calls:"
  },
  {
    type: "code",
    language: "js",
    content: `
      // Does not start a transaction yet
      const trxProvider = knex.transactionProvider();

      const books = [
        {title: 'Canterbury Tales'},
        {title: 'Moby Dick'},
        {title: 'Hamlet'}
      ];

      // Starts a transaction
      const trx = await trxProvider();
      const ids = await trx('catalogues')
        .insert({name: 'Old Books'}, 'id')
      books.forEach((book) => book.catalogue_id = ids[0]);
      await  trx('books').insert(books);
      
      // Reuses same transaction
      const sameTrx = await trxProvider();
      const ids2 = await sameTrx('catalogues')
        .insert({name: 'New Books'}, 'id')
      books.forEach((book) => book.catalogue_id = ids2[0]);
      await sameTrx('books').insert(books);
    `
  },
  {
    type: "text",
    content: "You can access promise that gets resolved after transaction is rolled back explicitly by user or committed, or rejected if it gets rolled back by DB itself, when using either way of creating transaction, from field `executionPromise`:"
  },
  {
    type: "code",
    language: "js",
    content: `
      const trxProvider = knex.transactionProvider();
      const trx = await trxProvider();
      const trxPromise = trx.executionPromise;
      
      const trx2 = await knex.transaction();
      const trx2Promise = trx2.executionPromise;

      const trxInitPromise = new Promise(async (resolve, reject) => {
        knex.transaction((transaction) => {
          resolve(transaction);
        });
      });
      const trx3 = await trxInitPromise;
      const trx3Promise = trx3.executionPromise;
    `
  },
  {
    type: "text",
    content: "You can check if a transaction has been committed or rolled back with the method `isCompleted`:"
  },
  {
    type: "code",
    language: "js",
    content: `
      const trx = await knex.transaction();
      trx.isCompleted(); // false
      await trx.commit();
      trx.isCompleted(); // true

      const trx2 = knex.transactionProvider();
      await trx2.rollback();
      trx2.isCompleted(); // true
    `
  }
]
