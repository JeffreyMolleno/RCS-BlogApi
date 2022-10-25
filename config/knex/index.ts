require("dotenv").config();
import Knex from 'knex';

// const config = require("../../knexfile")[process.env.NODE_ENVIRONMENT];
// console.log({ config });
// module.exports = require("knex")(config);

const knex = Knex({
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_COLLECTION,
      port: process.env.DATABASE_PORT as unknown as number,
    },
  });

export default knex;