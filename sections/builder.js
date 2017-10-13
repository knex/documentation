export default [
  {
    type: "heading",
    size: "lg",
    content: "Knex Query Builder",
    href: "Builder"
  },
  {
    type: "text",
    content: "The heart of the library, the knex query builder is the interface used for building and executing standard SQL queries, such as `select`, `insert`, `update`, `delete`."
  },
  {
    type: "method",
    method: "knex",
    example: "knex(tableName, options={only: boolean}) / knex.[methodName]",
    description: "The query builder starts off either by specifying a tableName you wish to query against, or by calling any method directly on the knex object. This kicks off a jQuery-like chain, with which you can call additional query builder methods as needed to construct the query, eventually calling any of the interface methods, to either convert toString, or execute the query with a promise, callback, or stream. Optional second argument for passing options:*   **only**: if `true`, the ONLY keyword is used before the `tableName` to discard inheriting tables' data. **NOTE:** only supported in PostgreSQL for now.",
    children: [    ]
  },
  {
    type: "method",
    method: "timeout",
    example: ".timeout(ms, options={cancel: boolean})",
    description: "Sets a timeout for the query and will throw a TimeoutError if the timeout is exceeded. The error contains information about the query, bindings, and the timeout that was set. Useful for complex queries that you want to make sure are not taking too long to execute. Optional second argument for passing options:*   **cancel**: if `true`, cancel query if timeout is reached. **NOTE:** only supported in MySQL and MariaDB for now.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select().from('books').timeout(1000)
        `
      },
      {
        type: "runnable",
        content: `
          knex.select().from('books').timeout(1000, {cancel: true}) // MySQL and MariaDB only
        `
      }
    ]
  },
  {
    type: "method",
    method: "select",
    example: ".select([*columns])",
    description: "Creates a select query, taking an optional array of columns for the query, eventually defaulting to * if none are specified when the query is built. The response of a select call will resolve with an array of objects selected from the database.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('title', 'author', 'year').from('books')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select().table('books')
        `
      }
    ]
  },
  {
    type: "method",
    method: "as",
    example: ".as(name)",
    description: "Allows for aliasing a subquery, taking the string you wish to name the current query. If the query is not a sub-query, it will be ignored.",
    children: [
      {
        type: "runnable",
        content: `
          knex.avg('sum_column1').from(function() {
            this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
          }).as('ignored_alias')
        `
      }
    ]
  },
  {
    type: "method",
    method: "column",
    example: ".column(columns)",
    description: "Specifically set the columns to be selected on a select query, taking an array or a list of of column names.",
    children: [
      {
        type: "runnable",
        content: `
          knex.column('title', 'author', 'year').select().from('books')
        `
      },
      {
        type: "runnable",
        content: `
          knex.column(['title', 'author', 'year']).select().from('books')
        `
      }
    ]
  },
  {
    type: "method",
    method: "from",
    example: ".from([tableName], options={only: boolean})",
    description: "Specifies the table used in the current query, replacing the current table name if one has already been specified. This is typically used in the sub-queries performed in the advanced where or union methods. Optional second argument for passing options:*   **only**: if `true`, the ONLY keyword is used before the `tableName` to discard inheriting tables' data. **NOTE:** only supported in PostgreSQL for now.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users')
        `
      }
    ]
  },
  {
    type: "method",
    method: "with",
    example: ".with(alias, function|raw)",
    description: "Add a \"with\" clause to the query. \"With\" clauses are supported by PostgreSQL, Oracle, SQLite3 and MSSQL.",
    children: [
      {
        type: "runnable",
        content: `
          knex.with('with_alias', knex.raw('select * from "books" where "author" = ?', 'Test')).select('*').from('with_alias')
        `
      },
      {
        type: "runnable",
        content: `
          knex.with('with_alias', (qb) => {
            qb.select('*').from('books').where('author', 'Test')
          }).select('*').from('with_alias')
        `
      }
    ]
  },
  {
    type: "method",
    method: "withSchema",
    example: ".withSchema([schemaName])",
    description: "Specifies the schema to be used as prefix of table name.",
    children: [
      {
        type: "runnable",
        content: `
          knex.withSchema('public').select('*').from('users')
        `
      }
    ]
  },
  {
    type: "heading",
    size: "md",
    content: "Where Clauses",
    href: "Builder-wheres"
  },
  {
    type: "text",
    content: [
      "Several methods exist to assist in dynamic where clauses. In many places functions may be used in place of values, constructing subqueries. In most places existing knex queries may be used to compose sub-queries, etc. Take a look at a few of the examples for each method for instruction on use:",
      "**Important:** Supplying knex with an `undefined` value to any of the `where` functions will cause knex to throw an error during sql compilation. This is both for yours and our sake. Knex cannot know what to do with undefined values in a where clause, and generally it would be a programmatic error to supply one to begin with. The error will throw a message containing the type of query and the compiled query-string. Example:"
    ]
  },
  {
    type: "runnable",
    content: `
      knex('accounts')
        .where('login', undefined)
        .select()
        .toSQL()
    `
  },
  {
    type: "method",
    method: "where",
    example: ".where(~mixed~)",
    children: [    ]
  },
  {
    type: "text",
    content: "Object Syntax:"
  },
  {
    type: "runnable",
    content: `
      knex('users').where({
        first_name: 'Test',
        last_name:  'User'
      }).select('id')
    `
  },
  {
    type: "text",
    content: "Key, Value:"
  },
  {
    type: "runnable",
    content: `
      knex('users').where('id', 1)
    `
  },
  {
    type: "text",
    content: "Grouped Chain:"
  },
  {
    type: "runnable",
    content: `
      knex('users').where(function() {
        this.where('id', 1).orWhere('id', '>', 10)
      }).orWhere({name: 'Tester'})
    `
  },
  {
    type: "text",
    content: "Operator:"
  },
  {
    type: "runnable",
    content: `
      knex('users').where('columnName', 'like', '%rowlikeme%')
    `
  },
  {
    type: "text",
    content: "The above query demonstrates the common use case of returning all users for which a specific pattern appears within a designated column."
  },
  {
    type: "runnable",
    content: `
      knex('users').where('votes', '>', 100)
    `
  },
  {
    type: "runnable",
    content: `
      var subquery = knex('users').where('votes', '>', 100).andWhere('status', 'active').orWhere('name', 'John').select('id');

      knex('accounts').where('id', 'in', subquery)
    `
  },
  {
    type: "text",
    content: ".orWhere with an object automatically wraps the statement and creates an `or (and - and - and)` clause"
  },
  {
    type: "runnable",
    content: `
      knex('users').where('id', 1).orWhere({votes: 100, user: 'knex'})
    `
  },
  {
    type: "method",
    method: "whereNot",
    example: ".whereNot(~mixed~)",
    children: [    ]
  },
  {
    type: "text",
    content: "Object Syntax:"
  },
  {
    type: "runnable",
    content: `
      knex('users').whereNot({
        first_name: 'Test',
        last_name:  'User'
      }).select('id')
    `
  },
  {
    type: "text",
    content: "Key, Value:"
  },
  {
    type: "runnable",
    content: `
      knex('users').whereNot('id', 1)
    `
  },
  {
    type: "text",
    content: "Grouped Chain:"
  },
  {
    type: "runnable",
    content: `
      knex('users').whereNot(function() {
        this.where('id', 1).orWhereNot('id', '>', 10)
      }).orWhereNot({name: 'Tester'})
    `
  },
  {
    type: "text",
    content: "Operator:"
  },
  {
    type: "runnable",
    content: `
      knex('users').whereNot('votes', '>', 100)
    `
  },
  {
    type: "text",
    content: "CAVEAT: WhereNot is not suitable for \"in\" and \"between\" type subqueries. You should use \"not in\" and \"not between\" instead."
  },
  {
    type: "runnable",
    content: `
      var subquery = knex('users')
        .whereNot('votes', '>', 100)
        .andWhere('status', 'active')
        .orWhere('name', 'John')
        .select('id');

      knex('accounts').where('id', 'not in', subquery)
    `
  },
  {
    type: "method",
    method: "whereIn",
    example: ".whereIn(column, array|callback|builder) / .orWhereIn",
    description: "Shorthand for .where('id', 'in', obj), the .whereIn and .orWhereIn methods add a \"where in\" clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('name').from('users')
            .whereIn('id', [1, 2, 3])
            .orWhereIn('id', [4, 5, 6])
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('name').from('users')
            .whereIn('account_id', function() {
              this.select('id').from('accounts');
            })
        `
      },
      {
        type: "runnable",
        content: `
          var subquery = knex.select('id').from('accounts');

          knex.select('name').from('users')
            .whereIn('account_id', subquery)
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereNotIn",
    example: ".whereNotIn(column, array|callback|builder) / .orWhereNotIn",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereNotIn('id', [1, 2, 3])
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').where('name', 'like', '%Test%').orWhereNotIn('id', [1, 2, 3])
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereNull",
    example: ".whereNull(column) / .orWhereNull",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereNull('updated_at')
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereNotNull",
    example: ".whereNotNull(column) / .orWhereNotNull",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereNotNull('created_at')
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereExists",
    example: ".whereExists(builder | callback) / .orWhereExists",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereExists(function() {
            this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
          })
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').whereExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereNotExists",
    example: ".whereNotExists(builder | callback) / .orWhereNotExists",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereNotExists(function() {
            this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
          })
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').whereNotExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereBetween",
    example: ".whereBetween(column, range) / .orWhereBetween",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereBetween('votes', [1, 100])
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereNotBetween",
    example: ".whereNotBetween(column, range) / .orWhereNotBetween",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereNotBetween('votes', [1, 100])
        `
      }
    ]
  },
  {
    type: "method",
    method: "whereRaw",
    example: ".whereRaw(query, [bindings])",
    description: "Convenience helper for .where(knex.raw(query)).",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').whereRaw('id = ?', [1])
        `
      }
    ]
  },
  {
    type: "heading",
    size: "md",
    content: "Join Methods"
  },
  {
    type: "text",
    content: "Several methods are provided which assist in building joins."
  },
  {
    type: "method",
    method: "join",
    example: ".join(table, first, [operator], second)",
    description: "The join builder can be used to specify joins between tables, with the first argument being the joining table, the next three arguments being the first join column, the join operator and the second join column, respectively.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users')
            .join('contacts', 'users.id', '=', 'contacts.user_id')
            .select('users.id', 'contacts.phone')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users')
            .join('contacts', 'users.id', 'contacts.user_id')
            .select('users.id', 'contacts.phone')
        `
      }
    ]
  },
  {
    type: "text",
    content: "For grouped joins, specify a function as the second argument for the join query, and use `on` with `orOn` or `andOn` to create joins that are grouped with parentheses."
  },
  {
    type: "runnable",
    content: `
      knex.select('*').from('users').join('accounts', function() {
        this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
      })
    `
  },
  {
    type: "text",
    content: "For nested join statements, specify a function as first argument of `on`, `orOn` or `andOn`"
  },
  {
    type: "runnable",
    content: `
      knex.select('*').from('users').join('accounts', function() {
        this.on(function() {
          this.on('accounts.id', '=', 'users.account_id')
          this.orOn('accounts.owner_id', '=', 'users.id')
        })
      })
    `
  },
  {
    type: "text",
    content: "It is also possible to use an object to represent the join syntax."
  },
  {
    type: "runnable",
    content: `
      knex.select('*').from('users').join('accounts', {'accounts.id': 'users.account_id'})
    `
  },
  {
    type: "text",
    content: "If you need to use a literal value (string, number, or boolean) in a join instead of a column, use `knex.raw`."
  },
  {
    type: "runnable",
    content: `
      knex.select('*').from('users').join('accounts', 'accounts.type', knex.raw('?', ['admin']))
    `
  },
  {
    type: "method",
    method: "innerJoin",
    example: ".innerJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.from('users').innerJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.table('users').innerJoin('accounts', 'users.id', '=', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').innerJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "leftJoin",
    example: ".leftJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').leftJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "leftOuterJoin",
    example: ".leftOuterJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').leftOuterJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').leftOuterJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "rightJoin",
    example: ".rightJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').rightJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').rightJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "rightOuterJoin",
    example: ".rightOuterJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').rightOuterJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').rightOuterJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "outerJoin",
    example: ".outerJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').outerJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').outerJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "fullOuterJoin",
    example: ".fullOuterJoin(table, ~mixed~)",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').fullOuterJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').fullOuterJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "crossJoin",
    example: ".crossJoin(table, ~mixed~)",
    description: "Cross join conditions are only supported in MySQL and SQLite3. For join conditions rather use innerJoin.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').crossJoin('accounts')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').crossJoin('accounts', 'users.id', 'accounts.user_id')
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').crossJoin('accounts', function() {
            this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "joinRaw",
    example: ".joinRaw(sql, [bindings])",
    description: "",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('accounts').joinRaw('natural full join table1').where('id', 1)
        `
      },
      {
        type: "runnable",
        content: `
          knex.select('*').from('accounts').join(knex.raw('natural full join table1')).where('id', 1)
        `
      }
    ]
  },
  {
    type: "heading",
    size: "md",
    content: "OnClauses",
    href: "Builder-on"
  },
  {
    type: "method",
    method: "onIn",
    example: ".onIn(column, values)",
    description: "Adds a onIn clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onIn('contacts.id', [7, 15, 23, 41])
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onNotIn",
    example: ".onNotIn(column, values)",
    description: "Adds a onNotIn clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onNotIn('contacts.id', [7, 15, 23, 41])
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onNull",
    example: ".onNull(column)",
    description: "Adds a onNull clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onNull('contacts.email')
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onNotNull",
    example: ".onNotNull(column)",
    description: "Adds a onNotNull clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onNotNull('contacts.email')
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onExists",
    example: ".onExists(builder | callback)",
    description: "Adds a onExists clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onExists(function() {
            this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
          })
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onNotExists",
    example: ".onNotExists(builder | callback)",
    description: "Adds a onNotExists clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onNotExists(function() {
            this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
          })
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onBetween",
    example: ".onBetween(column, range)",
    description: "Adds a onBetween clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onBetween('contacts.id', [5, 30])
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "onNotBetween",
    example: ".onNotBetween(column, range)",
    description: "Adds a onNotBetween clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').join('contacts', function() {
          this.on('users.id', '=', 'contacts.id').onNotBetween('contacts.id', [5, 30])
        })
        `
      }
    ]
  },
  {
    type: "heading",
    size: "md",
    content: "ClearClauses",
    href: "Builder-clear"
  },
  {
    type: "method",
    method: "clearSelect",
    example: ".clearSelect()",
    description: "Clears all select clauses from the query, excluding subqueries.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('email', 'name').from('users').clearSelect()
        `
      }
    ]
  },
  {
    type: "method",
    method: "clearWhere",
    example: ".clearWhere()",
    description: "Clears all where clauses from the query, excluding subqueries.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('email', 'name').from('users').where('id', 1).clearWhere()
        `
      }
    ]
  },
  {
    type: "method",
    method: "distinct",
    example: ".distinct()",
    description: "Sets a distinct clause on the query.",
    children: [
      {
        type: "runnable",
        content: `
          // select distinct 'first_name' from customers
          knex('customers')
            .distinct('first_name', 'last_name')
            .select()
        `
      }
    ]
  },
  {
    type: "method",
    method: "groupBy",
    example: ".groupBy(*names)",
    description: "Adds a group by clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').groupBy('count')
        `
      }
    ]
  },
  {
    type: "method",
    method: "groupByRaw",
    example: ".groupByRaw(sql)",
    description: "Adds a raw group by clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('year', knex.raw('SUM(profit)')).from('sales').groupByRaw('year WITH ROLLUP')
        `
      }
    ]
  },
  {
    type: "method",
    method: "orderBy",
    example: ".orderBy(column, [direction])",
    description: "Adds an order by clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').orderBy('name', 'desc')
        `
      }
    ]
  },
  {
    type: "method",
    method: "orderByRaw",
    example: ".orderByRaw(sql)",
    description: "Adds an order by raw clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('table').orderByRaw('col DESC NULLS LAST')
        `
      }
    ]
  },
  {
    type: "heading",
    size: "md",
    content: "Having Clauses",
    href: "Builder-havings"
  },
  {
    type: "method",
    method: "having",
    example: ".having(column, operator, value)",
    description: "Adds a having clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users')
            .groupBy('count')
            .orderBy('name', 'desc')
            .having('count', '>', 100)
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingIn",
    example: ".havingIn(column, values)",
    description: "Adds a havingIn clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingIn('id', [5, 3, 10, 17])
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingNotIn",
    example: ".havingNotIn(column, values)",
    description: "Adds a havingNotIn clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingNotIn('id', [5, 3, 10, 17])
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingNull",
    example: ".havingNull(column)",
    description: "Adds a havingNull clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingNull('email')
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingNotNull",
    example: ".havingNotNull(column)",
    description: "Adds a havingNotNull clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingNotNull('email')
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingExists",
    example: ".havingExists(builder | callback)",
    description: "Adds a havingExists clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').havingExists(function() {
          this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingNotExists",
    example: ".havingNotExists(builder | callback)",
    description: "Adds a havingNotExists clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
        knex.select('*').from('users').havingNotExists(function() {
          this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
        })
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingBetween",
    example: ".havingBetween(column, range)",
    description: "Adds a havingBetween clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingBetween('id', [5, 10])
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingNotBetween",
    example: ".havingNotBetween(column, range)",
    description: "Adds a havingNotBetween clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').havingNotBetween('id', [5, 10])
        `
      }
    ]
  },
  {
    type: "method",
    method: "havingRaw",
    example: ".havingRaw(column, operator, value)",
    description: "Adds a havingRaw clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users')
            .groupBy('count')
            .orderBy('name', 'desc')
            .havingRaw('count > ?', [100])
        `
      }
    ]
  },
  {
    type: "method",
    method: "offset",
    example: ".offset(value)",
    description: "Adds an offset clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').offset(10)
        `
      }
    ]
  },
  {
    type: "method",
    method: "limit",
    example: ".limit(value)",
    description: "Adds a limit clause to the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').limit(10).offset(30)
        `
      }
    ]
  },
  {
    type: "method",
    method: "union",
    example: ".union([*queries], [wrap])",
    description: "Creates a union query, taking an array or a list of callbacks to build the union statement, with optional boolean wrap. The queries will be individually wrapped in parentheses with a true wrap parameter.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').whereNull('last_name').union(function() {
            this.select('*').from('users').whereNull('first_name');
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "unionAll",
    example: ".unionAll(query)",
    description: "Creates a union all query, with the same method signature as the union method.",
    children: [
      {
        type: "runnable",
        content: `
          knex.select('*').from('users').whereNull('last_name').unionAll(function() {
            this.select('*').from('users').whereNull('first_name');
          })
        `
      }
    ]
  },
  {
    type: "method",
    method: "insert",
    example: ".insert(data, [returning])",
    description: "Creates an insert query, taking either a hash of properties to be inserted into the row, or an array of inserts, to be executed as a single insert command. Resolves the promise / fulfills the callback with an array containing the first insert id of the inserted model, or an array containing all inserted ids for postgresql.",
    children: [
      {
        type: "runnable",
        content: `
          // Returns [1] in \"mysql\", \"sqlite\", \"oracle\"; [] in \"postgresql\" unless the 'returning' parameter is set.
          knex('books').insert({title: 'Slaughterhouse Five'})
        `
      },
      {
        type: "runnable",
        content: `
          // Normalizes for empty keys on multi-row insert:
          knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
        `
      },
      {
        type: "runnable",
        content: `
          // Returns [2] in \"mysql\", \"sqlite\"; [2, 3] in \"postgresql\"
          knex.insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}], 'id').into('books')
        `
      }
    ]
  },
  {
    type: "text",
    content: "If one prefers that undefined keys are replaced with `NULL` instead of `DEFAULT` one may give `useNullAsDefault` configuration parameter in knex config."
  },
  {
    type: "code",
    language: "js",
    content: `
      var knex = require('knex')({
        client: 'mysql',
        connection: {
          host : '127.0.0.1',
          user : 'your_database_user',
          password : 'your_database_password',
          database : 'myapp_test'
        },
        useNullAsDefault: true
      });

      knex('coords').insert([{x: 20}, {y: 30}, {x: 10, y: 20}])
      // insert into \`coords\` (\`x\`, \`y\`) values (20, NULL), (NULL, 30), (10, 20)"
    `
  },
  {
    type: "method",
    method: "returning",
    example: ".returning(column) / .returning([column1, column2, ...])",
    description: "Utilized by PostgreSQL, MSSQL, and Oracle databases, the returning method specifies which column should be returned by the insert and update methods. Passed column parameter may be a string or an array of strings. When passed in a string, makes the SQL result be reported as an array of values from the specified column. When passed in an array of strings, makes the SQL result be reported as an array of objects, each containing a single property for each of the specified columns.",
    children: [
      {
        type: "runnable",
        content: `
          // Returns [1]
          knex('books')
            .returning('id')
            .insert({title: 'Slaughterhouse Five'})
        `
      },
      {
        type: "runnable",
        content: `
          // Returns [2] in \"mysql\", \"sqlite\"; [2, 3] in \"postgresql\"
          knex('books')
            .returning('id')
            .insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}])
        `
      },
      {
        type: "runnable",
        content: `
          // Returns [ { id: 1, title: 'Slaughterhouse Five' } ]
          knex('books')
            .returning(['id','title'])
            .insert({title: 'Slaughterhouse Five'})
        `
      }
    ]
  },
  {
    type: "method",
    method: "update",
    example: ".update(data, [returning]) / .update(key, value, [returning])",
    description: "Creates an update query, taking a hash of properties or a key/value pair to be updated based on the other query constraints. Resolves the promise / fulfills the callback with the number of affected rows for the query. If a key to be updated has value undefined it is ignored.",
    children: [
      {
        type: "runnable",
        content: `
          knex('books')
            .where('published_date', '<', 2000)
            .update({
              status: 'archived',
              thisKeyIsSkipped: undefined
            })
        `
      },
      {
        type: "runnable",
        content: `
          // Returns [1] in \"mysql\", \"sqlite\", \"oracle\"; [] in \"postgresql\" unless the 'returning' parameter is set.
          knex('books').update('title', 'Slaughterhouse Five')
        `
      }
    ]
  },
  {
    type: "method",
    method: "del / delete",
    example: ".del()",
    description: "Aliased to del as delete is a reserved word in JavaScript, this method deletes one or more rows, based on other conditions specified in the query. Resolves the promise / fulfills the callback with the number of affected rows for the query.",
    children: [
      {
        type: "runnable",
        content: `
          knex('accounts')
            .where('activated', false)
            .del()
        `
      }
    ]
  },
  {
    type: "method",
    method: "transacting",
    example: ".transacting(transactionObj)",
    description: "Used by knex.transaction, the transacting method may be chained to any query and passed the object you wish to join the query as part of the transaction for.",
    children: [
      {
        type: "code",
        language: "js",
        content: `
          var Promise = require('bluebird');
          knex.transaction(function(trx) {
            knex('books').transacting(trx).insert({name: 'Old Books'})
              .then(function(resp) {
                var id = resp[0];
                return someExternalMethod(id, trx);
              })
              .then(trx.commit)
              .catch(trx.rollback);
          })
          .then(function(resp) {
            console.log('Transaction complete.');
          })
          .catch(function(err) {
            console.error(err);
          });
        `
      }
    ]
  },
  {
    type: "method",
    method: "forUpdate",
    example: ".transacting(t).forUpdate()",
    description: "Dynamically added after a transaction is specified, the forUpdate adds a FOR UPDATE in PostgreSQL and MySQL during a select statement.",
    children: [
      {
        type: "runnable",
        content: `
          knex('tableName')
            .transacting(trx)
            .forUpdate()
            .select('*')
        `
      }
    ]
  },
  {
    type: "method",
    method: "forShare",
    example: ".transacting(t).forShare()",
    description: "Dynamically added after a transaction is specified, the forShare adds a FOR SHARE in PostgreSQL and a LOCK IN SHARE MODE for MySQL during a select statement.",
    children: [
      {
        type: "runnable",
        content: `
          knex('tableName')
            .transacting(trx)
            .forShare()
            .select('*')
        `
      }
    ]
  },
  {
    type: "method",
    method: "count",
    example: ".count(column|raw)",
    description: "Performs a count on the specified column. Also accepts raw expressions. Note that in Postgres, count returns a bigint type which will be a String and not a Number (more info).",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').count('active')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').count('active as a')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').count(knex.raw('??', ['active']))
        `
      }
    ]
  },
  {
    type: "text",
    content: "Use **countDistinct** to add a distinct expression inside the aggregate function."
  },
  {
    type: "runnable",
    content: `
      knex('users').countDistinct('active')
    `
  },
  {
    type: "method",
    method: "min",
    example: ".min(column|raw)",
    description: "Gets the minimum value for the specified column. Also accepts raw expressions.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').min('age')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').min('age as a')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').min(knex.raw('??', ['age']))
        `
      }
    ]
  },
  {
    type: "method",
    method: "max",
    example: ".max(column|raw)",
    description: "Gets the maximum value for the specified column. Also accepts raw expressions.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').max('age')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').max('age as a')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').max(knex.raw('??', ['age']))
        `
      }
    ]
  },
  {
    type: "method",
    method: "sum",
    example: ".sum(column|raw)",
    description: "Retrieve the sum of the values of a given column. Also accepts raw expressions.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').sum('products')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').sum('products as p')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').sum(knex.raw('??', ['products']))
        `
      }
    ]
  },
  {
    type: "text",
    content: "Use **sumDistinct** to add a distinct expression inside the aggregate function."
  },
  {
    type: "runnable",
    content: `
      knex('users').sumDistinct('products')
    `
  },
  {
    type: "method",
    method: "avg",
    example: ".avg(column|raw)",
    description: "Retrieve the average of the values of a given column. Also accepts raw expressions.",
    children: [
      {
        type: "runnable",
        content: `
          knex('users').avg('age')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').avg('age as a')
        `
      },
      {
        type: "runnable",
        content: `
          knex('users').avg(knex.raw('??', ['age']))
        `
      }
    ]
  },
  {
    type: "text",
    content: "Use **avgDistinct** to add a distinct expression inside the aggregate function."
  },
  {
    type: "runnable",
    content: `
      knex('users').avgDistinct('age')
    `
  },
  {
    type: "method",
    method: "increment",
    example: ".increment(column, amount)",
    description: "Increments a column value by the specified amount.",
    children: [
      {
        type: "runnable",
        content: `
          knex('accounts')
            .where('userid', '=', 1)
            .increment('balance', 10)
        `
      }
    ]
  },
  {
    type: "method",
    method: "decrement",
    example: ".decrement(column, amount)",
    description: "Decrements a column value by the specified amount.",
    children: [
      {
        type: "runnable",
        content: `
          knex('accounts').where('userid', '=', 1).decrement('balance', 5)
        `
      }
    ]
  },
  {
    type: "method",
    method: "truncate",
    example: ".truncate()",
    description: "Truncates the current table.",
    children: [
      {
        type: "runnable",
        content: `
          knex('accounts').truncate()
        `
      }
    ]
  },
  {
    type: "method",
    method: "pluck",
    example: ".pluck(id)",
    description: "This will pluck the specified column from each row in your results, yielding a promise which resolves to the array of values selected.",
    children: [
      {
        type: "code",
        language: "js",
        content: "knex.table('users').pluck('id').then(function(ids) { console.log(ids); });"
      }
    ]
  },
  {
    type: "method",
    method: "first",
    example: ".first([columns])",
    description: "Similar to select, but only retrieves & resolves with the first record from the query.",
    children: [
      {
        type: "code",
        language: "js",
        content: "knex.table('users').first('id', 'name').then(function(row) { console.log(row); });"
      }
    ]
  },
  {
    type: "method",
    method: "clone",
    example: ".clone()",
    description: "Clones the current query chain, useful for re-using partial query snippets in other queries without mutating the original.",
    children: [    ]
  },
  {
    type: "method",
    method: "modify",
    example: ".modify(fn, *arguments)",
    description: "Allows encapsulating and re-using query snippets and common behaviors as functions. The callback function should receive the query builder as its first argument, followed by the rest of the (optional) parameters passed to modify.",
    children: [
      {
        type: "code",
        language: "js",
        content: `
          var withUserName = function(queryBuilder, foreignKey) {
            queryBuilder.leftJoin('users', foreignKey, 'users.id').select('users.user_name');
          };
          knex.table('articles').select('title', 'body').modify(withUserName, 'articles_user.id').then(function(article) {
            console.log(article.user_name);
          });
        `
      }
    ]
  },
  {
    type: "method",
    method: "columnInfo",
    example: ".columnInfo([columnName])",
    description: "Returns an object with the column info about the current table, or an individual column if one is passed, returning an object with the following keys:*   **defaultValue**: the default value for the column*   **type**: the column type*   **maxLength**: the max length set for the column*   **nullable**: whether the column may be null",
    children: [
      {
        type: "code",
        language: "js",
        content: "knex('users').columnInfo().then(function(info) { // ... });"
      }
    ]
  },
  {
    type: "method",
    method: "debug",
    example: ".debug([enabled])",
    description: "Overrides the global debug setting for the current query chain. If enabled is omitted, query debugging will be turned on.",
    children: [    ]
  },
  {
    type: "method",
    method: "connection",
    description: " _ **(incomplete)** - This feature was incorrectly documented as functional._ <br/>If implemented, the method would set the db connection to use for the query without using the connection pool.",
    children: [    ]
  },
  {
    type: "method",
    method: "options",
    example: ".options()",
    description: "Allows for mixing in additional options as defined by database client specific libraries:",
    children: [
      {
        type: "code",
        language: "js",
        content: `
          knex('accounts as a1')
            .leftJoin('accounts as a2', function() {
              this.on('a1.email', '<>', 'a2.email');
            })
            .select(['a1.email', 'a2.email'])
            .where(knex.raw('a1.id = 1'))
            .options({ nestTables: true, rowMode: 'array' })
            .limit(2)
            .then(...
        `
      }
    ]
  }
]
