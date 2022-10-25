import type { Knex } from "knex";
require("dotenv").config();


// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT as unknown as number,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_COLLECTION,
    },
  },

  // staging: {
  //   client: "mysql2",
  //   connection: {
  //     host: process.env.DATABASE_HOST,
  //     // port: process.env.DATABASE_PORT,
  //     port: process.env.DATABASE_PORT ?? 3306,

  //     user: process.env.DATABASE_USER,
  //     password: process.env.DATABASE_PASSWORD,
  //     database: process.env.DATABASE_COLLECTION,
  //   },
  // },

  // production: {
  //   client: "mysql2",
  //   connection: {
  //     host: process.env.DATABASE_HOST,
  //     port: process.env.DATABASE_PORT,
  //     user: process.env.DATABASE_USER,
  //     password: process.env.DATABASE_PASSWORD,
  //     database: process.env.DATABASE_COLLECTION,
  //   },
  // }

};

module.exports = config;
