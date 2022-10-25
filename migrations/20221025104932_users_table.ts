import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function (table) {
        table.increments("user_id");
        table.string("first_name");
        table.string("middle_name");
        table.string("last_name");
        table.string("email");
        table.string("password");
        table.timestamp("create_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

